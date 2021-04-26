import { gql, useQuery } from '@apollo/client';
import { Optional } from '../utils/typeUtils';
import { GetPokemon, GetPokemonVariables } from './__generated__/GetPokemon';

export const GET_POKEMON = gql`
  query GetPokemon($id: ID!) {
    pokemon(id: $id) {
      id
      name
      height
      weight
      sprites {
        frontDefault
      }
      types {
        type {
          id
          name
        }
      }
    }
  }
`;

export const useGetPokemon = (
  variables: Optional<GetPokemonVariables, 'id'>
) => {
  return useQuery<GetPokemon>(GET_POKEMON, {
    variables,
    skip: !variables.id,
  });
};
