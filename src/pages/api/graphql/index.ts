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

export interface ApolloQueryResponse<T> {
  data?: T;
  error?: string;
}

export async function queryApolloServer<T>(
  query: string,
  variables: Record<string, any>
): Promise<ApolloQueryResponse<T>> {
  const { data, errors } = await apolloServer.executeOperation({
    query,
    variables,
  });

  const error = errors?.[0].message;

  return {
    data: data as T,
    ...(error ? { error } : {}),
  };
}
