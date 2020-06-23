import { dataSources } from './dataSources';

export interface ResolverContext {
  dataSources: typeof dataSources;
}
