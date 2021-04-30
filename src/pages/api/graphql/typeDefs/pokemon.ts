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

  type PokemonType {
    slot: Int!
    type: Type!
  }

  type Form {
    id: String!
    name: String!
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
    abilities: [PokemonAbility!]!
    forms: [Form!]!
    types: [PokemonType!]!
    favourite: Boolean!
  }

  type PokemonConnection {
    totalItems: Int!
    items: [Pokemon!]!
  }

  extend type Query {
    pokemon(id: ID!): Pokemon!
    allPokemon(offset: Int!, limit: Int!): PokemonConnection!
  }

  extend type Mutation {
    favouritePokemon(id: ID!, favourite: Boolean!): Pokemon!
  }
`;
