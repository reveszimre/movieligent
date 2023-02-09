import { SearchMovieWithValue } from 'domains';
import { useBackend } from 'hooks';
import React, { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react';
import { isSearchMovie } from 'type-guards';
import { IContext } from './types';

const Context = createContext<IContext | undefined>(undefined);

export const HomePageContext = React.memo(({ children }: PropsWithChildren) => {
  const [searchMovieValue, setSearchMovieValue] = useState<SearchMovieWithValue>();
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
      if (!isSearchMovie(data)) {
        return setError('Invalid data from server');
      }

      setError(undefined);
      setSearchMovieValue({ ...data, searchValue: query });
    },
    [request],
  );

  return <Context.Provider value={{ getData, searchMovieValue, setSearchMovieValue, error, isLoading }}>{children}</Context.Provider>;
});

export const useHomePageContext = (): IContext => {
  const context = useContext(Context);
  if (context === undefined) {
    throw Error('useHomePageContext must be inside HomePageContext');
  }
  return context;
};
