import { SearchMovie } from 'domains';

export const isSearchMovie = (data?: unknown): data is SearchMovie => {
  return true;
};
