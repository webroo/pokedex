export const capitalize = (str: string): string =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

export const formatPokemonID = (id: string): string => id.padStart(3, '0');

export const formatHeight = (height: number): string => `${height / 10} m`;

export const formatWeight = (weight: number): string => `${weight / 10} kg`;
