import { ApolloServer } from 'apollo-server-micro';
import { dataSources } from './dataSources';
import { typeDefs, resolvers } from './schema';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => dataSources,
});

export const config = {
  api: { bodyParser: false },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
