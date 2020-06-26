import { RESTDataSource } from 'apollo-datasource-rest';

export type ResourceType = 'pokemon' | 'ability';

export interface NamedApiResource {
  name: string;
  url: string;
}

export interface NamedApiResourceList {
  count: number;
  results: NamedApiResource[];
}

export interface Ability {
  id: string;
  name: string;
  isMainSeries: boolean;
}

export interface PokemonAbility {
  isHidden: boolean;
  slot: number;
  ability: NamedApiResource;
}

export interface Species {
  id: string;
  name: string;
  captureRate: number;
  baseHappiness: number;
}

export interface Form {
  id: string;
  name: string;
  formName: string;
}

export interface Pokemon {
  id: string;
  name: string;
  height: number;
  weight: number;
  baseExperience: number;
  species: NamedApiResource;
  abilities: PokemonAbility[];
  forms: NamedApiResource[];
}

const camelCaseKeys = (obj: any): any => {
  if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => {
      const newKey = key.replace(/_([a-z])/g, s => s[1].toUpperCase());
      return { ...acc, [newKey]: camelCaseKeys(obj[key]) };
    }, {});
  } else if (Array.isArray(obj)) {
    return obj.map(v => camelCaseKeys(v));
  }
  return obj;
};

export class PokeApi extends RESTDataSource {
  async getResourceList(
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

  async getResource<T>(type: ResourceType, id: string): Promise<T> {
    const response = await this.get<T>(
      `https://pokeapi.co/api/v2/${type}/${id}/`
    );
    return camelCaseKeys(response);
  }

  async getUrl<T>(url: string): Promise<T> {
    const response = await this.get<T>(url);
    return camelCaseKeys(response);
  }
}

export const dataSources = {
  pokeApi: new PokeApi(),
};
