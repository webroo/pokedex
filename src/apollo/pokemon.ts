import { gql, useQuery } from '@apollo/client';
import { GetPokemon } from './__generated__/GetPokemon';

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
        items {
          slot
          type {
            id
            name
          }
        }
      }
    }
  }
`;

export interface GetPokemonVariables {
  id?: string;
}

export const useGetPokemon = (variables: GetPokemonVariables) => {
  return useQuery<GetPokemon>(GET_POKEMON, {
    variables,
    skip: !variables.id,
  });
};
