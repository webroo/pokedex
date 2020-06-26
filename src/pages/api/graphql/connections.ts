import { ResourceType } from './dataSources';
import { ResolverContext } from './resolverContext';

export interface Connection<T> {
  totalItems: number;
  items: T[];
}

export interface ConnectionArgs {
  offset: number;
  limit: number;
}

export const connectionFromResourceList = <TItem>(
  resourceType: ResourceType
) => async (
  _: void,
  { offset, limit }: ConnectionArgs,
  { dataSources }: ResolverContext
): Promise<Connection<TItem>> => {
  const resourceList = await dataSources.pokeApi.getResourceList(
    resourceType,
    offset,
    limit
  );
  const fetchedResults = await Promise.all(
    resourceList.results.map(resource =>
      dataSources.pokeApi.getUrl<TItem>(resource.url)
    )
  );
  return {
    totalItems: resourceList.count,
    items: fetchedResults,
  };
};
