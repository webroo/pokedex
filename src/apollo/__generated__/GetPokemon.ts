/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPokemon
// ====================================================

export interface GetPokemon_pokemon_sprites {
  __typename: "PokemonSprites";
  frontDefault: string;
}

export interface GetPokemon_pokemon_types_items_type {
  __typename: "Type";
  id: string;
  name: string;
}

export interface GetPokemon_pokemon_types_items {
  __typename: "PokemonType";
  slot: number;
  type: GetPokemon_pokemon_types_items_type;
}

export interface GetPokemon_pokemon_types {
  __typename: "PokemonTypeConnection";
  items: GetPokemon_pokemon_types_items[];
}

export interface GetPokemon_pokemon {
  __typename: "Pokemon";
  id: string;
  name: string;
  height: number;
  weight: number;
  sprites: GetPokemon_pokemon_sprites;
  types: GetPokemon_pokemon_types;
}

export interface GetPokemon {
  pokemon: GetPokemon_pokemon | null;
}

export interface GetPokemonVariables {
  id: string;
}