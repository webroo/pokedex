import { gql } from 'apollo-server-micro';

export default gql`
  type Type {
    id: ID!
    name: String!
  }

  type TypeConnection {
    totalItems: Int!
    items: [Type!]!
  }

  extend type Query {
    type(id: ID!): Type
    allTypes(offset: Int!, limit: Int!): TypeConnection!
  }
`;
