import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { useGetPokemon, useFavouritePokemon } from '../../apollo/pokemon';
import { Pokemon } from '../../components/pokemon/Pokemon';
import styles from './[id].module.css';

const PokemonPage: FunctionComponent = () => {
  const { query } = useRouter();
  const id = query.id as string | undefined;

  const { data, error } = useGetPokemon({ id });
  const [setFavouritePokemon] = useFavouritePokemon();

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
                onFavouriteClick={() =>
                  setFavouritePokemon({
                    variables: {
                      id: data.pokemon.id,
                      favourite: !data.pokemon.favourite,
                    },
                  })
                }
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
