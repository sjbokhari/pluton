import type { FindRevenues } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Link, routes } from '@redwoodjs/router'

import Revenues from 'src/components/Revenue/Revenues'

export const QUERY = gql`
  query FindRevenues {
    revenues {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No revenues yet. '}
      <Link
        to={routes.newRevenue()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ revenues }: CellSuccessProps<FindRevenues>) => {
  return <Revenues revenues={revenues} />
}
