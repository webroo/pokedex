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

export interface PokemonSprites {
  backDefault: string;
  backShiny: string;
  frontDefault: string;
  frontShiny: string;
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
  sprites: PokemonSprites;
}
