import type { EditRevenueById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import RevenueForm from 'src/components/Revenue/RevenueForm'

export const QUERY = gql`
  query EditRevenueById($id: String!) {
    revenue: revenue(id: $id) {
      id
      title
      customer
      seasson
      revenue
      created_at
    }
  }
`
const UPDATE_REVENUE_MUTATION = gql`
  mutation UpdateRevenueMutation($id: String!, $input: UpdateRevenueInput!) {
    updateRevenue(id: $id, input: $input) {
      id
      title
      customer
      seasson
      revenue
      created_at
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ revenue }: CellSuccessProps<EditRevenueById>) => {
  const [updateRevenue, { loading, error }] = useMutation(UPDATE_REVENUE_MUTATION, {
    onCompleted: () => {
      toast.success('Revenue updated')
      navigate(routes.revenues())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateRevenue({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Revenue {revenue.id}</h2>
      </header>
      <div className="rw-segment-main">
        <RevenueForm revenue={revenue} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
