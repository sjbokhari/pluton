import { db } from 'src/lib/db'
import type { QueryResolvers, MutationResolvers } from 'types/graphql'

export const revenues: QueryResolvers['revenues'] = () => {
  return db.revenue.findMany()
}

export const revenue: QueryResolvers['revenue'] = ({ id }) => {
  return db.revenue.findUnique({
    where: { id },
  })
}

export const createRevenue: MutationResolvers['createRevenue'] = ({
  input,
}) => {
  return db.revenue.create({
    data: input,
  })
}

export const updateRevenue: MutationResolvers['updateRevenue'] = ({
  id,
  input,
}) => {
  return db.revenue.update({
    data: input,
    where: { id },
  })
}

export const deleteRevenue: MutationResolvers['deleteRevenue'] = ({ id }) => {
  return db.revenue.delete({
    where: { id },
  })
}
