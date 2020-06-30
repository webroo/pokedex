import {
  Pokemon,
  Species,
  PokemonAbility,
  Ability,
  Form,
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
  Pokemon: {
    species: linkedResource<Pokemon, Species>(parent => parent.species),
    forms: connectionToResourceArray<Pokemon, Form>(parent => parent.forms),
    abilities: connectionToArray<Pokemon, PokemonAbility>(
      parent => parent.abilities
    ),
  },
};
