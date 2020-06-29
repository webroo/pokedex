import { gql } from 'apollo-server-micro';
import { rootResource, rootResourceList } from '../commonResolvers';
import { Ability } from '../dataSources/pokeApiTypes';

export const abilityTypeDefs = gql`
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

export const abilityResolvers = {
  Query: {
    ability: rootResource<Ability>('ability'),
    allAbilities: rootResourceList<Ability>('ability'),
  },
};
