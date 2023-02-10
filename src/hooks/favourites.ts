import { Favourite } from 'domains';
import { useCallback, useEffect, useState } from 'react';
// import { isFavouriteArray } from 'type-guards';

export const useFavouritesHook = () => {
  const [favourites, setFavourites] = useState<Favourite[]>(() => {
    const favs = localStorage.getItem('moviligent-favourites');
    if (!favs) {
      return [];
    }
    let parsed;
    try {
      parsed = JSON.parse(favs);
    } catch {
      return [];
    }
    // TODO: refactor, if type-guard done
    // return isFavouriteArray(favs) ? favs : [];
    return parsed ? (parsed as Favourite[]) : [];
  });

  const addFavourite = useCallback(
    (f: Favourite) => {
      if (!favourites.find((it) => it.id === f.id)) {
        favourites.push(f);
        setFavourites([...favourites]);
      }
    },
    [favourites],
  );

  const removeFavourite = useCallback(
    (id: string) => {
      const itemIndex = favourites.findIndex((it) => it.id === id);
      if (itemIndex >= 0) {
        favourites.splice(itemIndex, 1);
        setFavourites([...favourites]);
      }
    },
    [favourites],
  );

  useEffect(() => {
    localStorage.setItem('moviligent-favourites', JSON.stringify(favourites));
  }, [favourites]);

  return { favourites, addFavourite, removeFavourite };
};
