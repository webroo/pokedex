import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { useGetPokemon } from '../../apollo/getPokemon';
import { Pokemon } from '../../components/pokemon/Pokemon';
import styles from './[id].module.css';

const PokemonPage: FunctionComponent = () => {
  const { query } = useRouter();
  const id = query.id as string | undefined;

  const { loading, data, error } = useGetPokemon({ id });

  return (
    <>
      <div className={styles.wrapper}>
        <div>
          {loading && <div>Loading...</div>}
          {error && <div>{error.message}</div>}
          {data?.pokemon && <Pokemon pokemon={data.pokemon} />}
        </div>
      </div>
    </>
  );
};

export default PokemonPage;
