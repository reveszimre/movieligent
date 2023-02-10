import { SearchMovie } from 'domains';
import { useBackend, useFavouritesHook } from 'hooks';
import React, { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react';
import { isSearchMovieResponse } from 'type-guards';
import { IContext } from './types';

const Context = createContext<IContext | undefined>(undefined);

export const HomePageContext = React.memo(({ children }: PropsWithChildren) => {
  const [searchMovie, setSearchMovie] = useState<SearchMovie>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const { request } = useBackend();

  const getData = useCallback(
    async ({ page, query }: { page?: number; query: string }) => {
      setIsLoading(true);
      const res = await request({ page, query });
      setIsLoading(false);
      if ('error' in res) {
        return setError(res.error);
      }

      const { data } = res;
      if (!isSearchMovieResponse(data)) {
        return setError('Invalid data from server');
      }

      setError(undefined);
      setSearchMovie({ ...data, searchValue: query });
    },
    [request],
  );

  return <Context.Provider value={{ getData, searchMovie, setSearchMovie, error, isLoading, ...useFavouritesHook() }}>{children}</Context.Provider>;
});

export const useHomePageContext = (): IContext => {
  const context = useContext(Context);
  if (context === undefined) {
    throw Error('useHomePageContext must be inside HomePageContext');
  }
  return context;
};
