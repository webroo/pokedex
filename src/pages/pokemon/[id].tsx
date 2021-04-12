import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/dist/client/router';

const Pokemon: FunctionComponent = () => {
  const { query } = useRouter();
  console.log(`query:`, query);

  return (
    <>
      <Head>
        <title>Pokédex - POKEMON NAME GOES HERE</title>
      </Head>
      <div>Pokemon</div>
    </>
  );
};

export default Pokemon;
