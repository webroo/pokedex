import { gql, IResolvers } from 'apollo-server-micro';
import { Pokemon, Species, PokemonAbility, Ability, Form } from './dataSources';
import { ResolverContext } from './resolverContext';
import {
  connectionFromResourceList,
  connectionFromResourceArray,
  connectionFromArray,
} from './connections';

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

  type PokemonAbilityConnection {
    totalItems: Int!
    items: [PokemonAbility!]!
  }

  type Form {
    id: String!
    name: String!
    formName: String!
  }

  type FormConnection {
    totalItems: Int!
    items: [Form!]!
  }

  type Pokemon {
    id: ID!
    name: String!
    height: Int!
    weight: Int!
    baseExperience: Int!
    species: Species!
    abilities(offset: Int = 0, limit: Int = 20): PokemonAbilityConnection!
    forms(offset: Int = 0, limit: Int = 20): FormConnection!
  }

  type PokemonConnection {
    totalItems: Int!
    items: [Pokemon!]!
  }

  type AbilityConnection {
    totalItems: Int!
    items: [Ability!]!
  }

  type Query {
    pokemon(id: ID!): Pokemon
    allPokemon(offset: Int!, limit: Int!): PokemonConnection!
    ability(id: ID!): Ability
    allAbilities(offset: Int!, limit: Int!): AbilityConnection!
  }
`;

interface IdArgs {
  id: string;
}

export const resolvers: IResolvers<any, ResolverContext> = {
  Query: {
    async pokemon(_, args: IdArgs, { dataSources }) {
      return await dataSources.pokeApi.getResource<Pokemon>('pokemon', args.id);
    },
    allPokemon: connectionFromResourceList<Pokemon>('pokemon'),
    async ability(_, args: IdArgs, { dataSources }) {
      return await dataSources.pokeApi.getResource<Pokemon>('ability', args.id);
    },
    allAbilities: connectionFromResourceList<Ability>('ability'),
  },
  PokemonAbility: {
    async ability(parent: PokemonAbility, _, { dataSources }) {
      return await dataSources.pokeApi.getUrl<Ability>(parent.ability.url);
    },
  },
  Pokemon: {
    async species(parent: Pokemon, _, { dataSources }) {
      return await dataSources.pokeApi.getUrl<Species>(parent.species.url);
    },
    forms: connectionFromResourceArray<Pokemon, Form>(parent => parent.forms),
    abilities: connectionFromArray<Pokemon, PokemonAbility>(
      parent => parent.abilities
    ),
  },
};
