import { gql } from 'apollo-server-micro';

export default gql`
  type Species {
    id: ID!
    name: String!
    captureRate: Int!
    baseHappiness: Int!
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

  type PokemonType {
    slot: Int!
    type: Type!
  }

  type PokemonTypeConnection {
    totalItems: Int!
    items: [PokemonType]!
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

  type PokemonSprites {
    backDefault: String!
    backShiny: String!
    frontDefault: String!
    frontShiny: String!
  }

  type Pokemon {
    id: ID!
    name: String!
    height: Int!
    weight: Int!
    baseExperience: Int!
    species: Species!
    sprites: PokemonSprites!
    abilities(offset: Int = 0, limit: Int = 20): PokemonAbilityConnection!
    forms(offset: Int = 0, limit: Int = 20): FormConnection!
    types(offset: Int = 0, limit: Int = 20): PokemonTypeConnection!
  }

  type PokemonConnection {
    totalItems: Int!
    items: [Pokemon!]!
  }

  extend type Query {
    pokemon(id: ID!): Pokemon
    allPokemon(offset: Int!, limit: Int!): PokemonConnection!
  }
`;
