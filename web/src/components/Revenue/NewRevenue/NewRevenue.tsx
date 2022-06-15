import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import RevenueForm from 'src/components/Revenue/RevenueForm'

const CREATE_REVENUE_MUTATION = gql`
  mutation CreateRevenueMutation($input: CreateRevenueInput!) {
    createRevenue(input: $input) {
      id
    }
  }
`

const NewRevenue = () => {
  const [createRevenue, { loading, error }] = useMutation(CREATE_REVENUE_MUTATION, {
    onCompleted: () => {
      toast.success('Revenue created')
      navigate(routes.revenues())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createRevenue({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Revenue</h2>
      </header>
      <div className="rw-segment-main">
        <RevenueForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewRevenue
