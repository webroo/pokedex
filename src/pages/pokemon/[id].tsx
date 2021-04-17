import React, { FunctionComponent } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { GetPokemonResult, GET_POKEMON_QUERY } from '../../apollo/getPokemon';
import { capitalize } from '../../utils/stringUtils';
import { ApolloQueryResponse, queryApolloServer } from '../api/graphql';

export type PokemonProps = ApolloQueryResponse<GetPokemonResult>;

export const getServerSideProps: GetServerSideProps<PokemonProps> = async context => {
  const response = await queryApolloServer<GetPokemonResult>(
    GET_POKEMON_QUERY,
    { id: context.query.id }
  );
  return {
    props: response,
  };
};

const Pokemon: FunctionComponent<PokemonProps> = ({ data, error }) => {
  return (
    <>
      <Head>
        <title>Pokédex - {capitalize(data?.pokemon?.name ?? '')}</title>
      </Head>
      {error && <div>{error}</div>}
      {data?.pokemon && (
        <div>
          <h1>{capitalize(data.pokemon.name)}</h1>
          <Image
            src={data.pokemon.sprites.frontDefault}
            width={96}
            height={96}
            alt={data.pokemon.name}
          />
        </div>
      )}
    </>
  );
};

export default Pokemon;
