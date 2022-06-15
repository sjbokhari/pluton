import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_REVENUE_MUTATION = gql`
  mutation DeleteRevenueMutation($id: String!) {
    deleteRevenue(id: $id) {
      id
    }
  }
`

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

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
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

const Revenue = ({ revenue }) => {
  const [deleteRevenue] = useMutation(DELETE_REVENUE_MUTATION, {
    onCompleted: () => {
      toast.success('Revenue deleted')
      navigate(routes.revenues())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete revenue ' + id + '?')) {
      deleteRevenue({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Revenue {revenue.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{revenue.id}</td>
            </tr><tr>
              <th>Title</th>
              <td>{revenue.title}</td>
            </tr><tr>
              <th>Customer id</th>
              <td>{revenue.customer_id}</td>
            </tr><tr>
              <th>Seasson id</th>
              <td>{revenue.seasson_id}</td>
            </tr><tr>
              <th>Created at</th>
              <td>{timeTag(revenue.created_at)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editRevenue({ id: revenue.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(revenue.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Revenue
