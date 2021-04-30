import React, { FunctionComponent } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import {
  capitalize,
  formatHeight,
  formatPokemonID,
  formatWeight,
} from '../../utils/stringUtils';
import styles from './Pokemon.module.css';
import { GetPokemon_pokemon } from '../../apollo/__generated__/GetPokemon';
import { FavouriteButton } from '../favouriteButton/FavouriteButton';

interface PokemonProps {
  pokemon: GetPokemon_pokemon;
  onFavouriteClick: () => void;
}

export const Pokemon: FunctionComponent<PokemonProps> = ({
  pokemon,
  onFavouriteClick,
}) => {
  const stats = [
    { title: 'Height:', value: formatHeight(pokemon.height) },
    { title: 'Weight:', value: formatWeight(pokemon.weight) },
  ];

  return (
    <>
      <h1 className={styles.header}>
        <span>{capitalize(pokemon.name)}</span>
        <span className={styles.headerNumber}>
          #{formatPokemonID(pokemon.id)}
        </span>
      </h1>
      <div className={styles.image}>
        <Image
          src={pokemon.sprites.frontDefault}
          width={192}
          height={192}
          alt={pokemon.name}
        />
      </div>
      <div>
        <FavouriteButton
          selected={pokemon.favourite}
          onClick={onFavouriteClick}
        >
          Favourite
        </FavouriteButton>
      </div>
      <h2>Attributes</h2>
      <ul className={styles.stats}>
        {stats.map(stat => (
          <li key={stat.title} className={styles.stat}>
            <span className={styles.statTitle}>{stat.title}</span>{' '}
            <span>{stat.value}</span>
          </li>
        ))}
      </ul>
      <h2>Type</h2>
      <ul className={styles.types}>
        {pokemon.types.map(({ type }) => (
          <li
            key={type.id}
            className={cn(styles.type, styles[`type-${type.name}`])}
          >
            {capitalize(type.name)}
          </li>
        ))}
      </ul>
    </>
  );
};
