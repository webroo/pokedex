export const GET_ALL_POKEMON_QUERY = `
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
