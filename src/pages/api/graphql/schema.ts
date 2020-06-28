import { gql } from 'apollo-server-micro';
import { Pokemon, Species, PokemonAbility, Ability, Form } from './dataSources';
import {
  rootResource,
  rootResourceList,
  linkedResource,
  connectionToResourceArray,
  connectionToArray,
} from './commonResolvers';

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

export const resolvers = {
  Query: {
    pokemon: rootResource<Pokemon>('pokemon'),
    allPokemon: rootResourceList<Pokemon>('pokemon'),
    ability: rootResource<Ability>('ability'),
    allAbilities: rootResourceList<Ability>('ability'),
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
