import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useGetPokemon } from '../../hooks/useGetPokemon';
import { capitalize } from '../../utils/stringUtils';

const Pokemon: FunctionComponent = () => {
  const { query } = useRouter();

  const { loading, data, error } = useGetPokemon(
    { id: `${query.id}` },
    { skip: !query.id }
  );

  return (
    <>
      <Head>
        <title>Pokédex - {capitalize(data?.pokemon.name ?? '')}</title>
      </Head>
      {loading && <div>Loading...</div>}
      {error && <div>Error</div>}
      {data && (
        <div>
          <Image
            src={data.pokemon.sprites.frontDefault}
            width={96}
            height={96}
            alt={data.pokemon.name}
          />
          <div>#{data.pokemon.id}</div>
          <div>{capitalize(data.pokemon.name)}</div>
        </div>
      )}
    </>
  );
};

export default Pokemon;
