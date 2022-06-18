import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/Revenue/RevenuesCell'

const DELETE_REVENUE_MUTATION = gql`
  mutation DeleteRevenueMutation($id: String!) {
    deleteRevenue(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const RevenuesList = ({ revenues }) => {
  const [deleteRevenue] = useMutation(DELETE_REVENUE_MUTATION, {
    onCompleted: () => {
      toast.success('Revenue deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete revenue ' + id + '?')) {
      deleteRevenue({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Customer</th>
            <th>Seasson</th>
            <th>Revenue</th>
            <th>Created at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {revenues.map((revenue) => (
            <tr key={revenue.id}>
              <td>{truncate(revenue.id)}</td>
              <td>{truncate(revenue.title)}</td>
              <td>{truncate(revenue.customer)}</td>
              <td>{truncate(revenue.seasson)}</td>
              <td>{truncate(revenue.revenue)}</td>
              <td>{timeTag(revenue.created_at)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.revenue({ id: revenue.id })}
                    title={'Show revenue ' + revenue.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editRevenue({ id: revenue.id })}
                    title={'Edit revenue ' + revenue.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete revenue ' + revenue.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(revenue.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RevenuesList
