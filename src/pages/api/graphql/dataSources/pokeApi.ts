import { RESTDataSource } from 'apollo-datasource-rest';
import { NamedApiResourceList } from './pokeApiTypes';

export type ResourceType = 'pokemon' | 'ability';

const camelCaseKeys = (obj: any): any => {
  if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => {
      const newKey = key.replace(/_([a-z])/g, s => s[1].toUpperCase());
      acc[newKey] = camelCaseKeys(obj[key]);
      return acc;
    }, {} as any);
  } else if (Array.isArray(obj)) {
    return obj.map(v => camelCaseKeys(v));
  }
  return obj;
};

export class PokeApi extends RESTDataSource {
  async getRootResource<TResult>(
    type: ResourceType,
    id: string
  ): Promise<TResult> {
    const response = await this.get<TResult>(
      `https://pokeapi.co/api/v2/${type}/${id}/`
    );
    return camelCaseKeys(response);
  }

  async getRootResourceList(
    type: string,
    offset: number,
    limit: number
  ): Promise<NamedApiResourceList> {
    const response = await this.get<NamedApiResourceList>(
      `https://pokeapi.co/api/v2/${type}`,
      { offset, limit }
    );
    return camelCaseKeys(response);
  }

  async getUrl<TResult>(url: string): Promise<TResult> {
    const response = await this.get<TResult>(url);
    return camelCaseKeys(response);
  }
}
