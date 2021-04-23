import { gql, useQuery } from '@apollo/client';

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

// TODO generate these types
export interface GetPokemonVariables {
  id?: string;
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
    types: {
      items: Array<{
        slot: number;
        type: {
          id: string;
          name: string;
        };
      }>;
    };
  };
}

export const useGetPokemon = (variables: GetPokemonVariables) => {
  return useQuery<GetPokemonResult>(GET_POKEMON, {
    variables,
    skip: !variables.id,
  });
};
