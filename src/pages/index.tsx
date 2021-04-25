import React, { FunctionComponent } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import {
  GetAllPokemonResult,
  GET_ALL_POKEMON_QUERY,
} from '../apollo/getAllPokemon';
import { ApolloQueryResponse, queryApolloServer } from './api/graphql';
import styles from './index.module.css';
import { PokemonGrid } from '../components/pokemonGrid/PokemonGrid';

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
      <main className={styles.wrapper}>
        <h1>Pokédex</h1>
        {error && <div>{error}</div>}
        {data && <PokemonGrid allPokemon={data.allPokemon} />}
      </main>
    </>
  );
};

export default PokemonList;
