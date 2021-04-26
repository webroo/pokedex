import { ResolverContext } from '../resolverContext';
import { NamedApiResource } from '../dataSources/pokeApiTypes';
import { ResourceType } from '../dataSources/pokeApi';

export interface RootResourceArgs {
  id: string;
}

export interface Connection<T> {
  totalItems: number;
  items: T[];
}

export interface ConnectionArgs {
  offset: number;
  limit: number;
}

export const rootResource = <TResource>(type: ResourceType) => async (
  _: void,
  { id }: RootResourceArgs,
  { dataSources }: ResolverContext
) => {
  return await dataSources.pokeApi.getRootResource<TResource>(type, id);
};

export const rootResourceList = <TResource>(
  resourceType: ResourceType
) => async (
  _: void,
  { offset, limit }: ConnectionArgs,
  { dataSources }: ResolverContext
): Promise<Connection<TResource>> => {
  const resourceList = await dataSources.pokeApi.getRootResourceList(
    resourceType,
    offset,
    limit
  );
  const fetchedResults = await Promise.all(
    resourceList.results.map(resource =>
      dataSources.pokeApi.getUrl<TResource>(resource.url)
    )
  );
  return {
    totalItems: resourceList.count,
    items: fetchedResults,
  };
};

export const linkedResource = <TParent, TResource>(
  fieldSelector: (parent: TParent) => NamedApiResource
) => async (
  parent: TParent,
  _: void,
  { dataSources }: ResolverContext
): Promise<TResource> => {
  const resource = fieldSelector(parent);
  return await dataSources.pokeApi.getUrl<TResource>(resource.url);
};

export const linkedResourceArray = <TParent, TResource>(
  fieldSelector: (parent: TParent) => NamedApiResource[]
) => async (
  parent: TParent,
  _: void,
  { dataSources }: ResolverContext
): Promise<TResource[]> => {
  const resources = fieldSelector(parent);
  const fetchedResources = await Promise.all(
    resources.map(resource =>
      dataSources.pokeApi.getUrl<TResource>(resource.url)
    )
  );
  return fetchedResources;
};

export const connectionToResourceArray = <TParent, TResource>(
  fieldSelector: (parent: TParent) => NamedApiResource[]
) => async (
  parent: TParent,
  { offset, limit }: ConnectionArgs,
  { dataSources }: ResolverContext
): Promise<Connection<TResource>> => {
  const resources = fieldSelector(parent);
  const fetchedResources = await Promise.all(
    resources
      .slice(offset, offset + limit)
      .map(resource => dataSources.pokeApi.getUrl<TResource>(resource.url))
  );
  return {
    totalItems: resources.length,
    items: fetchedResources,
  };
};

export const connectionToArray = <TParent, TArrayElement>(
  fieldSelector: (parent: TParent) => any[]
) => (
  parent: TParent,
  { offset, limit }: ConnectionArgs
): Connection<TArrayElement> => {
  const resources = fieldSelector(parent);
  return {
    totalItems: resources.length,
    items: resources.slice(offset, offset + limit),
  };
};
