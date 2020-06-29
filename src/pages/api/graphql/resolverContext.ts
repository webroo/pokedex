import { dataSources } from './dataSources/pokeApi';

export interface ResolverContext {
  dataSources: typeof dataSources;
}
