import React, { FunctionComponent, useState } from 'react';
import { useRouter } from 'next/router';
import { useGetPokemon } from '../../apollo/pokemon';
import { Pokemon } from '../../components/pokemon/Pokemon';
import styles from './[id].module.css';

const PokemonPage: FunctionComponent = () => {
  const { query } = useRouter();
  const id = query.id as string | undefined;

  const { data, error } = useGetPokemon({ id });

  const [isFavourite, setIsFavourite] = useState(false);

  return (
    <>
      <div className={styles.wrapper}>
        <div>
          {error ? (
            <div>{error.message}</div>
          ) : data ? (
            <div>
              <Pokemon
                pokemon={data.pokemon}
                isFavourite={isFavourite}
                onFavouriteClick={() => setIsFavourite(!isFavourite)}
              />
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </>
  );
};

export default PokemonPage;
