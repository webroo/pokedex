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
