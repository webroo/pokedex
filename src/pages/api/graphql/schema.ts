import { gql } from 'apollo-server-micro';
import { Pokemon, Species, PokemonAbility, Ability, Form } from './dataSources';
import { ResolverContext } from './resolverContext';

export const typeDefs = gql`
  type Species {
    id: ID!
    name: String!
    captureRate: Int!
    baseHappiness: Int!
  }

  type Ability {
    id: ID!
    name: String!
    isMainSeries: Boolean!
  }

  type PokemonAbility {
    isHidden: Boolean!
    slot: Int!
    ability: Ability!
  }

  type PokemonAbilityList {
    count: Int!
    results: [PokemonAbility!]!
  }

  type Form {
    id: String!
    name: String!
    formName: String!
  }

  type FormList {
    count: Int!
    results: [Form!]!
  }

  type Pokemon {
    id: ID!
    name: String!
    height: Int!
    weight: Int!
    baseExperience: Int!
    species: Species!
    abilities(offset: Int = 0, limit: Int = 20): PokemonAbilityList!
    forms(offset: Int = 0, limit: Int = 20): FormList!
  }

  type PokemonList {
    count: Int!
    results: [Pokemon!]!
  }

  type AbilityList {
    count: Int!
    results: [Ability!]!
  }

  type Query {
    pokemon(id: ID!): Pokemon
    allPokemon(offset: Int!, limit: Int!): PokemonList!
    allAbilities(offset: Int!, limit: Int!): AbilityList!
  }
`;

interface ListArgs {
  offset: number;
  limit: number;
}

interface List<T> {
  count: number;
  results: T[];
}

export const resolvers = {
  Query: {
    async pokemon(_root: void, args: { id: string }, ctx: ResolverContext) {
      return await ctx.dataSources.pokeApi.getPokemon(args.id);
    },
    async allPokemon(
      _root: void,
      args: ListArgs,
      ctx: ResolverContext
    ): Promise<List<Pokemon>> {
      const pokemonList = await ctx.dataSources.pokeApi.getPokemonList(
        args.offset,
        args.limit
      );
      const results = await Promise.all(
        pokemonList.results.map(apiResouce =>
          ctx.dataSources.pokeApi.getResourceFromUrl<Pokemon>(apiResouce.url)
        )
      );
      return {
        count: pokemonList.count,
        results,
      };
    },

    /*
    This resolver fetches a pre-paginated NamedApiResourceList items and then fetches each item in it
      // this result is fetched from the pokeapi, then we fetch each item in `results`
      abilities: {
        count,
        results: [
          { name, url},
          ...etc
        ],
      ]
    */
    async allAbilities(
      _root: void,
      args: ListArgs,
      ctx: ResolverContext
    ): Promise<List<Ability>> {
      const abilityList = await ctx.dataSources.pokeApi.getAbilityList(
        args.offset,
        args.limit
      );
      const results = await Promise.all(
        abilityList.results.map(apiResouce =>
          ctx.dataSources.pokeApi.getResourceFromUrl<Ability>(apiResouce.url)
        )
      );
      return {
        count: abilityList.count,
        results,
      };
    },
  },
  PokemonAbility: {
    async ability(parent: PokemonAbility, _args: void, ctx: ResolverContext) {
      return await ctx.dataSources.pokeApi.getResourceFromUrl<Ability>(
        parent.ability.url
      );
    },
  },
  Pokemon: {
    async species(parent: Pokemon, _args: void, ctx: ResolverContext) {
      return await ctx.dataSources.pokeApi.getResourceFromUrl<Species>(
        parent.species.url
      );
    },

    /*
    This resolver simply paginates an array of non-fetchable items:
      abilities: [
        {
          slot,
          isHidden,
          ability: { name, url }
        },
        ...etc
      ]
    */
    abilities(parent: Pokemon, args: ListArgs): List<PokemonAbility> {
      return {
        count: parent.abilities.length,
        results: parent.abilities.slice(args.offset, args.offset + args.limit),
      };
    },

    /*
    This resolver paginates and fetches items from an array of NamedApiResources:
      forms: [
        { name, url},
        ...etc
      ]
    */
    async forms(
      parent: Pokemon,
      args: ListArgs,
      ctx: ResolverContext
    ): Promise<List<Form>> {
      const formResources = parent.forms.slice(
        args.offset,
        args.offset + args.limit
      );
      const results = await Promise.all(
        formResources.map(apiResouce =>
          ctx.dataSources.pokeApi.getResourceFromUrl<Form>(apiResouce.url)
        )
      );
      return {
        count: parent.forms.length,
        results,
      };
    },
  },
};
