import { SearchMovieResponse } from 'domains';

export const isSearchMovieResponse = (data?: unknown): data is SearchMovieResponse => {
  return true;
};
