import { gql, useMutation, useQuery } from '@apollo/client';
import { Optional } from '../utils/typeUtils';
import { GetPokemon, GetPokemonVariables } from './__generated__/GetPokemon';
import {
  FavouritePokemonVariables,
  FavouritePokemon_favouritePokemon,
} from './__generated__/FavouritePokemon';

export const GET_POKEMON = gql`
  query GetPokemon($id: ID!) {
    pokemon(id: $id) {
      id
      name
      height
      weight
      favourite
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

export const FAVOURITE_POKEMON = gql`
  mutation FavouritePokemon($id: ID!, $favourite: Boolean!) {
    favouritePokemon(id: $id, favourite: $favourite) {
      id
      favourite
    }
  }
`;

export const useFavouritePokemon = () => {
  return useMutation<
    FavouritePokemon_favouritePokemon,
    FavouritePokemonVariables
  >(FAVOURITE_POKEMON);
};
