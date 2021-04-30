export class FavouritePokemon {
  readonly pokemon: Record<string, boolean | undefined> = {};

  getFavoutite(id: string): boolean {
    return this.pokemon[id] ?? false;
  }

  setFavourite(id: string, isFavourite: boolean): string {
    this.pokemon[id] = isFavourite;
    return id;
  }
}
