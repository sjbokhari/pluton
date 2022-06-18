export const schema = gql`
  type Revenue {
    id: String!
    title: String!
    customer: String!
    seasson: String!
    revenue: Float!
    created_at: DateTime!
  }

  type Query {
    revenues: [Revenue!]! @requireAuth
    revenue(id: String!): Revenue @requireAuth
  }

  input CreateRevenueInput {
    title: String!
    customer: String!
    seasson: String!
    revenue: Float!
  }

  input UpdateRevenueInput {
    title: String
    customer: String
    seasson: String
    revenue: Float
  }

  type Mutation {
    createRevenue(input: CreateRevenueInput!): Revenue! @requireAuth
    updateRevenue(id: String!, input: UpdateRevenueInput!): Revenue!
      @requireAuth
    deleteRevenue(id: String!): Revenue! @requireAuth
  }
`
