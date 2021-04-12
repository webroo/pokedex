import { gql, useQuery } from '@apollo/client';

const GET_ALL_POKEMON = gql`
  query GetAllPokemon($offset: Int!, $limit: Int!) {
    allPokemon(offset: $offset, limit: $limit) {
      totalItems
      items {
        id
        name
        sprites {
          frontDefault
        }
      }
    }
  }
`;

// TODO generate these types
export interface GetAllPokemonVariables {
  offset: number;
  limit: number;
}

export interface GetAllPokemonResult {
  allPokemon: {
    totalItems: number;
    items: Array<{
      id: string;
      name: string;
      sprites: {
        frontDefault: string;
      };
    }>;
  };
}

export const useGetAllPokemon = (variables: GetAllPokemonVariables) => {
  return useQuery<GetAllPokemonResult>(GET_ALL_POKEMON, { variables });
};
