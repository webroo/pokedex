import { gql, useQuery } from '@apollo/client';

export const GET_POKEMON_QUERY = `
  query GetPokemon($id: ID!) {
    pokemon(id: $id) {
      id
      name
      height
      weight
      sprites {
        frontDefault
      }
    }
  }
`;

const GET_POKEMON_QUERY_TAG = gql`
  ${GET_POKEMON_QUERY}
`;

export interface GetPokemonOptions {
  skip?: boolean;
}

// TODO generate these types
export interface GetPokemonVariables {
  id: string;
}

export interface GetPokemonResult {
  pokemon: {
    id: string;
    name: string;
    height: number;
    weight: number;
    sprites: {
      frontDefault: string;
    };
  };
}

export const useGetPokemon = (
  variables: GetPokemonVariables,
  options?: GetPokemonOptions
) => {
  return useQuery<GetPokemonResult>(GET_POKEMON_QUERY_TAG, {
    variables,
    skip: options?.skip,
  });
};
