import { gql } from 'apollo-server-micro';

export default gql`
  type Ability {
    id: ID!
    name: String!
    isMainSeries: Boolean!
  }

  type AbilityConnection {
    totalItems: Int!
    items: [Ability!]!
  }

  extend type Query {
    ability(id: ID!): Ability
    allAbilities(offset: Int!, limit: Int!): AbilityConnection!
  }
`;
