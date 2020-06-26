import { ResourceType, NamedApiResource } from './dataSources';
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

export const connectionFromResourceArray = <TParent, TItem>(
  fieldSelector: (parent: TParent) => NamedApiResource[]
) => async (
  parent: TParent,
  { offset, limit }: ConnectionArgs,
  { dataSources }: ResolverContext
): Promise<Connection<TItem>> => {
  const resources = fieldSelector(parent);
  const fetchedResources = await Promise.all(
    resources
      .slice(offset, offset + limit)
      .map(resource => dataSources.pokeApi.getUrl<TItem>(resource.url))
  );
  return {
    totalItems: resources.length,
    items: fetchedResources,
  };
};

export const connectionFromArray = <TParent, TItem>(
  fieldSelector: (parent: TParent) => any[]
) => (
  parent: TParent,
  { offset, limit }: ConnectionArgs
): Connection<TItem> => {
  const resources = fieldSelector(parent);
  return {
    totalItems: resources.length,
    items: resources.slice(offset, offset + limit),
  };
};
