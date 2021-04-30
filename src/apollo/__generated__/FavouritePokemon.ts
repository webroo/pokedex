/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FavouritePokemon
// ====================================================

export interface FavouritePokemon_favouritePokemon {
  __typename: "Pokemon";
  id: string;
  favourite: boolean;
}

export interface FavouritePokemon {
  favouritePokemon: FavouritePokemon_favouritePokemon;
}

export interface FavouritePokemonVariables {
  id: string;
  favourite: boolean;
}
