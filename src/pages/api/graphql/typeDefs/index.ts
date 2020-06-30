import { gql } from 'apollo-server-micro';
import pokemon from './pokemon';
import ability from './ability';

export const base = gql`
  type Query
`;

export default [base, pokemon, ability];
