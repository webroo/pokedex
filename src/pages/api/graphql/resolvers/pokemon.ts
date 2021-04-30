import {
  Pokemon,
  Species,
  PokemonAbility,
  Ability,
  Form,
  PokemonType,
  Type,
} from '../dataSources/pokeApiTypes';
import { ResolverContext } from '../resolverContext';
import {
  rootResource,
  rootResourceList,
  linkedResource,
  linkedResourceArray,
} from './shared';

export default {
  Query: {
    pokemon: rootResource<Pokemon>('pokemon'),
    allPokemon: rootResourceList<Pokemon>('pokemon'),
  },
  Mutation: {
    favouritePokemon: (
      _: void,
      { id, favourite }: { id: string; favourite: boolean },
      { favouritePokemon }: ResolverContext
    ) => {
      favouritePokemon.setFavourite(id, favourite);
      return { id, favourite };
    },
  },
  PokemonAbility: {
    ability: linkedResource<PokemonAbility, Ability>(parent => parent.ability),
  },
  PokemonType: {
    type: linkedResource<PokemonType, Type>(parent => parent.type),
  },
  Pokemon: {
    species: linkedResource<Pokemon, Species>(parent => parent.species),
    forms: linkedResourceArray<Pokemon, Form>(parent => parent.forms),
    favourite: (
      parent: Pokemon,
      _: void,
      { favouritePokemon }: ResolverContext
    ) => {
      return favouritePokemon.getFavoutite(parent.id);
    },
  },
};
