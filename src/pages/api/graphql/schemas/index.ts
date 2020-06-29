import { gql } from 'apollo-server-micro';
import { pokemonTypeDefs, pokemonResolvers } from './pokemon';
import { abilityTypeDefs, abilityResolvers } from './ability';

const baseTypeDefs = gql`
  type Query
`;

export const typeDefs = [baseTypeDefs, pokemonTypeDefs, abilityTypeDefs];
export const resolvers = [pokemonResolvers, abilityResolvers];
