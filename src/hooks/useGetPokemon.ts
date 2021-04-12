import { gql, useQuery } from '@apollo/client';

const GET_POKEMON = gql`
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
  return useQuery<GetPokemonResult>(GET_POKEMON, {
    variables,
    skip: options?.skip,
  });
};
