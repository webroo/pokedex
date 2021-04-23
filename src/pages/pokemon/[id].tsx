import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import cn from 'classnames';
import { useGetPokemon, GetPokemonResult } from '../../apollo/getPokemon';
import {
  capitalize,
  formatHeight,
  formatPokemonID,
  formatWeight,
} from '../../utils/stringUtils';
import styles from './[id].module.css';

interface PokemonProps {
  pokemon: GetPokemonResult['pokemon'];
}

const Pokemon: FunctionComponent<PokemonProps> = ({ pokemon }) => {
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
      <h2>Attributes</h2>
      <ul className={styles.stats}>
        {stats.map(stat => (
          <li key={stat.title} className={styles.stat}>
            <span className={styles.statTitle}>{stat.title}</span>
            <span>{stat.value}</span>
          </li>
        ))}
      </ul>
      <h2>Type</h2>
      <ul className={styles.types}>
        {pokemon.types.items.map(({ type }) => (
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

const PokemonPage: FunctionComponent = () => {
  const { query } = useRouter();

  const { loading, data, error } = useGetPokemon({ id: query.id?.toString() });

  return (
    <>
      <Head>
        <title>Pokédex - {capitalize(data?.pokemon?.name ?? '')}</title>
      </Head>
      <div className={styles.wrapper}>
        <div>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {data?.pokemon && <Pokemon pokemon={data.pokemon} />}
        </div>
      </div>
    </>
  );
};

export default PokemonPage;
