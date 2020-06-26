import { gql, IResolvers } from 'apollo-server-micro';
import {
  Pokemon,
  Species,
  PokemonAbility,
  Ability,
  Form,
  ResourceType,
  NamedApiResource,
} from './dataSources';
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

const getRootResource = <T>(type: ResourceType) => async (
  _: void,
  args: IdArgs,
  { dataSources }: ResolverContext
) => {
  return await dataSources.pokeApi.getResource<T>(type, args.id);
};

const getResource = <TParent, TItem>(
  fieldSelector: (parent: TParent) => NamedApiResource
) => async (
  parent: TParent,
  _: void,
  { dataSources }: ResolverContext
): Promise<TItem> => {
  const resource = fieldSelector(parent);
  return await dataSources.pokeApi.getUrl<TItem>(resource.url);
};

export const resolvers: IResolvers<any, ResolverContext> = {
  Query: {
    pokemon: getRootResource<Pokemon>('pokemon'),
    allPokemon: connectionFromResourceList<Pokemon>('pokemon'),
    ability: getRootResource<Ability>('ability'),
    allAbilities: connectionFromResourceList<Ability>('ability'),
  },
  PokemonAbility: {
    ability: getResource<PokemonAbility, Ability>(parent => parent.ability),
  },
  Pokemon: {
    species: getResource<Pokemon, Species>(parent => parent.species),
    forms: connectionFromResourceArray<Pokemon, Form>(parent => parent.forms),
    abilities: connectionFromArray<Pokemon, PokemonAbility>(
      parent => parent.abilities
    ),
  },
};
