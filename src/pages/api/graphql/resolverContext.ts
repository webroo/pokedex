import dataSources from './dataSources';
import { FavouritePokemon } from './dataSources/favouritePokemon';

export interface ResolverContext {
  dataSources: typeof dataSources;
  favouritePokemon: FavouritePokemon;
}
