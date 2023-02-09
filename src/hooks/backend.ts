import { useEnvironmentVariablesContext } from 'contexts';
import { useCallback } from 'react';

export const useBackend = () => {
  const { API_KEY, MOVIE_API_URL } = useEnvironmentVariablesContext();

  const request = useCallback(
    async ({ page, query }: { page?: number; query: string }): Promise<{ data: unknown } | { error: string }> => {
      let url = `${MOVIE_API_URL}?api_key=${API_KEY}&query=${query}`;
      if (page) {
        url += `&page=${page}`;
      }

      const headers: {
        'Content-type': string;
        Authorization?: string;
      } = {
        'Content-type': 'application/json; charset=UTF-8',
      };

      let response;
      try {
        response = await fetch(url, {
          credentials: 'same-origin',
          headers,
          method: 'GET',
        });
        response = await response.json();
      } catch (err) {
        return {
          error: 'Server error',
        };
      }

      return { data: response };
    },
    [API_KEY, MOVIE_API_URL],
  );

  return {
    request,
  };
};
