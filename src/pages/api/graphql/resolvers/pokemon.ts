import {
  Pokemon,
  Species,
  PokemonAbility,
  Ability,
  Form,
  PokemonType,
  Type,
} from '../dataSources/pokeApiTypes';
import {
  rootResource,
  rootResourceList,
  linkedResource,
  connectionToResourceArray,
  connectionToArray,
} from './shared';

export default {
  Query: {
    pokemon: rootResource<Pokemon>('pokemon'),
    allPokemon: rootResourceList<Pokemon>('pokemon'),
  },
  PokemonAbility: {
    ability: linkedResource<PokemonAbility, Ability>(parent => parent.ability),
  },
  PokemonType: {
    type: linkedResource<PokemonType, Type>(parent => parent.type),
  },
  Pokemon: {
    species: linkedResource<Pokemon, Species>(parent => parent.species),
    forms: connectionToResourceArray<Pokemon, Form>(parent => parent.forms),
    abilities: connectionToArray<Pokemon, PokemonAbility>(
      parent => parent.abilities
    ),
    types: connectionToArray<Pokemon, PokemonType>(parent => parent.types),
  },
};
