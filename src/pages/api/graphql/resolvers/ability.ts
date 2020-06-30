import { Ability } from '../dataSources/pokeApiTypes';
import { rootResource, rootResourceList } from './shared';

export default {
  Query: {
    ability: rootResource<Ability>('ability'),
    allAbilities: rootResourceList<Ability>('ability'),
  },
};
