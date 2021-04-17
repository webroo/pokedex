import React, { FunctionComponent } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import {
  GetAllPokemonResult,
  GET_ALL_POKEMON_QUERY,
} from '../apollo/getAllPokemon';
import { ApolloQueryResponse, queryApolloServer } from './api/graphql';
import { capitalize } from '../utils/stringUtils';
import styles from './index.module.css';

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
  <Link href={`/pokemon/${name}`}>
    <a className={styles.pokemonListItem}>
      <Image src={spriteUrl} width={96} height={96} alt={name} />
      <div>#{id}</div>
      <div>{capitalize(name)}</div>
    </a>
  </Link>
);

export type PokemonListProps = ApolloQueryResponse<GetAllPokemonResult>;

export const getServerSideProps: GetServerSideProps<PokemonListProps> = async () => {
  const response = await queryApolloServer<GetAllPokemonResult>(
    GET_ALL_POKEMON_QUERY,
    { offset: 0, limit: 9 }
  );
  return {
    props: response,
  };
};

const PokemonList: FunctionComponent<PokemonListProps> = ({ data, error }) => {
  return (
    <>
      <Head>
        <title>Pokédex</title>
      </Head>
      <main>
        <h1>Pokédex</h1>
        {error && <div>{error}</div>}
        {data && (
          <div className={styles.pokemonList}>
            {data.allPokemon.items.map(pokemon => (
              <PokemonItem
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

export default PokemonList;
