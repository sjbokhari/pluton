export const schema = gql`
  type Revenue {
    id: String!
    title: String!
    customer_id: String!
    seasson_id: String!
    created_at: DateTime!
  }

  type Query {
    revenues: [Revenue!]! @requireAuth
    revenue(id: String!): Revenue @requireAuth
  }

  input CreateRevenueInput {
    title: String!
    customer_id: String!
    seasson_id: String!
  }

  input UpdateRevenueInput {
    title: String
    customer_id: String
    seasson_id: String
  }

  type Mutation {
    createRevenue(input: CreateRevenueInput!): Revenue! @requireAuth
    updateRevenue(id: String!, input: UpdateRevenueInput!): Revenue!
      @requireAuth
    deleteRevenue(id: String!): Revenue! @requireAuth
  }
`
