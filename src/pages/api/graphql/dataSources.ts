import { RESTDataSource } from 'apollo-datasource-rest';

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
  async getPokemon(id: string): Promise<Pokemon> {
    const response = await this.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return camelCaseKeys(response);
  }

  async getPokemonList(
    offset: number,
    limit: number
  ): Promise<NamedApiResourceList> {
    const response = await this.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    return camelCaseKeys(response);
  }

  async getAbilityList(
    offset: number,
    limit: number
  ): Promise<NamedApiResourceList> {
    const response = await this.get(
      `https://pokeapi.co/api/v2/ability?offset=${offset}&limit=${limit}`
    );
    return camelCaseKeys(response);
  }

  async getResourceFromUrl<T>(url: string): Promise<T> {
    const response = await this.get(url);
    return camelCaseKeys(response);
  }
}

export const dataSources = {
  pokeApi: new PokeApi(),
};
