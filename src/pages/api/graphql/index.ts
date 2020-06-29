import { ApolloServer } from 'apollo-server-micro';
import { dataSources } from './dataSources/pokeApi';
import { typeDefs, resolvers } from './schemas';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => dataSources,
});

export const config = {
  api: { bodyParser: false },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
