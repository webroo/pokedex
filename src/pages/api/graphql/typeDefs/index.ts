import { gql } from 'apollo-server-micro';
import pokemon from './pokemon';
import ability from './ability';
import type from './type';

export const base = gql`
  type Query
  type Mutation
`;

export default [base, pokemon, ability, type];
