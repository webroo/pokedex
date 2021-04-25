import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GetAllPokemonResult } from '../../apollo/getAllPokemon';
import { capitalize, formatPokemonID } from '../../utils/stringUtils';
import styles from './PokemonGrid.module.css';

interface PokemonItemProps {
  id: string;
  name: string;
  spriteUrl: string;
}

const PokemonItem: FunctionComponent<PokemonItemProps> = ({
  id,
  name,
  spriteUrl,
}) => (
  <div className={styles.pokemonGridItem}>
    <Link href={`/pokemon/${name}`}>
      <a>
        <div className={styles.pokemonImage}>
          <Image src={spriteUrl} width={192} height={192} alt={name} />
        </div>
        <div>
          <span>{capitalize(name)}</span>
          <span className={styles.pokemonNumber}>#{formatPokemonID(id)}</span>
        </div>
      </a>
    </Link>
  </div>
);

interface PokemonGridProps {
  allPokemon: GetAllPokemonResult['allPokemon'];
}

export const PokemonGrid: FunctionComponent<PokemonGridProps> = ({
  allPokemon,
}) => (
  <div className={styles.pokemonGrid}>
    {allPokemon.items.map(pokemon => (
      <PokemonItem
        key={pokemon.id}
        id={pokemon.id}
        name={pokemon.name}
        spriteUrl={pokemon.sprites.frontDefault}
      />
    ))}
  </div>
);
