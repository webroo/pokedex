import { ApolloServer } from 'apollo-server-micro';
import dataSources from './dataSources';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => dataSources,
});

export const config = {
  api: { bodyParser: false },
};

export default apolloServer.createHandler({ path: '/api/graphql' });

export const queryGraphQL = async (query: string, variables: any = {}) => {
  const { data, errors } = await apolloServer.executeOperation({
    query,
    variables,
  });

  // TODO: ensure errors are serializable for getServerSideProps
  return { data, errors: errors ? true : false };
};
