import { Type } from '../dataSources/pokeApiTypes';
import { rootResource, rootResourceList } from './shared';

export default {
  Query: {
    type: rootResource<Type>('type'),
    allTypes: rootResourceList<Type>('type'),
  },
};
