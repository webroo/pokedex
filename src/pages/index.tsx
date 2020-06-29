import React from 'react';
import Head from 'next/head';
import { gql, useQuery } from '@apollo/client';

interface Pokemon {
  id: string;
  name: string;
  weight: number;
  height: number;
}

interface GetPokemonQuery {
  pokemon: Pokemon;
}

interface GetPokemonQueryVariables {
  id: string;
}

const GET_POKEMON = gql`
  query GetPokemon($id: ID!) {
    pokemon(id: $id) {
      id
      name
      weight
      height
    }
  }
`;

const Home = () => {
  const { loading, data, error } = useQuery<
    GetPokemonQuery,
    GetPokemonQueryVariables
  >(GET_POKEMON, {
    variables: { id: '1' },
  });

  return (
    <div>
      <Head>
        <title>Pokédex</title>
      </Head>

      <main>
        <h1>Pokédex</h1>
        {loading && <div>Loading...</div>}
        {error && <div>Error</div>}
        {data && (
          <dl>
            <dt>ID</dt>
            <dd>{data.pokemon.id}</dd>
            <dt>Name</dt>
            <dd>{data.pokemon.name}</dd>
            <dt>Weight</dt>
            <dd>{data.pokemon.weight}</dd>
            <dt>Height</dt>
            <dd>{data.pokemon.height}</dd>
          </dl>
        )}
      </main>
    </div>
  );
};

export default Home;
