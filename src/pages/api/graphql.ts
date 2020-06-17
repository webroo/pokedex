import { ApolloServer, gql } from 'apollo-server-micro';
import { RESTDataSource } from 'apollo-datasource-rest';

interface Species {
  id: string;
  name: string;
  captureRate: number;
  baseHappiness: number;
}

interface Pokemon {
  id: string;
  name: string;
  height: number;
  weight: number;
  baseExperience: number;
  species: Species;
}

const typeDefs = gql`
  type Species {
    id: ID!
    name: String!
    captureRate: Int!
    baseHappiness: Int!
  }

  type Pokemon {
    id: ID!
    name: String!
    height: Int!
    weight: Int!
    baseExperience: Int!
    species: Species!
  }

  type PokemonListItem {
    name: String!
  }

  type PokemonList {
    count: Int
    results: [PokemonListItem!]!
  }

  type Query {
    pokemon(id: ID!): Pokemon
    pokemonList(offset: Int, limit: Int): PokemonList
  }
`;

const camelCaseKeys = (obj: any): any => {
  if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => {
      const newKey = key.replace(/_([a-z])/g, s => s[1].toUpperCase());
      return { ...acc, [newKey]: camelCaseKeys(obj[key]) };
    }, {});
  } else if (Array.isArray(obj)) {
    return obj.map(v => camelCaseKeys(v));
  }
  return obj;
};

class PokeApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://pokeapi.co/api/v2/';
  }

  async getPokemon(id: string): Promise<Pokemon> {
    const response = await this.get(`pokemon/${id}`);
    return camelCaseKeys(response);
  }

  async getSpecies(id: string): Promise<Species> {
    const response = await this.get(`pokemon-species/${id}`);
    return camelCaseKeys(response);
  }
}

const dataSources = {
  pokeApi: new PokeApi(),
};

interface Context {
  dataSources: typeof dataSources;
}

const resolvers = {
  Query: {
    async pokemon(_root: {}, { id }: { id: string }, { dataSources }: Context) {
      return await dataSources.pokeApi.getPokemon(id);
    },
  },
  Pokemon: {
    async species(parent: Pokemon, _args: {}, { dataSources }: Context) {
      return await dataSources.pokeApi.getSpecies(parent.species.name);
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => dataSources,
  mocks: false,
});

export const config = {
  api: { bodyParser: false },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
