import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useGetAllPokemon } from '../hooks/useGetAllPokemon';
import styles from './index.module.css';

interface PokemonProps {
  id: string;
  name: string;
  spriteUrl: string;
}

const Pokemon: FunctionComponent<PokemonProps> = ({ id, name, spriteUrl }) => (
  <Link href={`/pokemon/${name}`}>
    <a className={styles.pokemonListItem}>
      <Image src={spriteUrl} width={96} height={96} alt={`name`} />
      <div>#{id}</div>
      <div>{name[0].toUpperCase() + name.slice(1)}</div>
    </a>
  </Link>
);

const Home: FunctionComponent = () => {
  const { loading, data, error } = useGetAllPokemon({ offset: 0, limit: 3 });

  return (
    <>
      <Head>
        <title>Pokédex</title>
      </Head>
      <main>
        <h1>Pokédex</h1>
        {loading && <div>Loading...</div>}
        {error && <div>Error</div>}
        {data && (
          <div className={styles.pokemonList}>
            {data.allPokemon.items.map(pokemon => (
              <Pokemon
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                spriteUrl={pokemon.sprites.frontDefault}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
