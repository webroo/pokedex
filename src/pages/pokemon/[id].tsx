import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { GetPokemonResult, GET_POKEMON_QUERY } from '../../hooks/useGetPokemon';
import { capitalize } from '../../utils/stringUtils';
import { queryGraphQL } from '../api/graphql';
import { GetServerSideProps } from 'next';

// TODO clean up prop types
interface PokemonProps {
  pokemon?: GetPokemonResult['pokemon'];
  errors?: boolean;
}

export const getServerSideProps: GetServerSideProps<PokemonProps> = async context => {
  // TODO create some sensible type abstractions around making graphql queries directly
  const { data, errors } = await queryGraphQL(GET_POKEMON_QUERY, {
    id: context.query.id,
  });

  return {
    props: {
      pokemon: data?.pokemon,
      // TODO should such errors be handled as 500?
      errors,
    },
  };
};

const Pokemon: FunctionComponent<PokemonProps> = ({ pokemon, errors }) => {
  return (
    <>
      <Head>
        <title>Pokédex - {capitalize(pokemon?.name ?? '')}</title>
      </Head>
      {errors && <div>Error</div>}
      {pokemon && (
        <div>
          <h1>{capitalize(pokemon.name)}</h1>
          <Image
            src={pokemon.sprites.frontDefault}
            width={96}
            height={96}
            alt={pokemon.name}
          />
        </div>
      )}
    </>
  );
};

export default Pokemon;
