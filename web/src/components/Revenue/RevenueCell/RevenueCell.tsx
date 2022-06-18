import type { FindRevenueById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Revenue from 'src/components/Revenue/Revenue'

export const QUERY = gql`
  query FindRevenueById($id: String!) {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Revenue not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ revenue }: CellSuccessProps<FindRevenueById>) => {
  return <Revenue revenue={revenue} />
}
