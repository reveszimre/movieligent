import { SearchMovieWithValue } from 'domains';

export type IContext = {
  getData: (p: { page?: number; query: string }) => void;
  searchMovieValue?: SearchMovieWithValue;
  setSearchMovieValue: (s?: SearchMovieWithValue) => void;
  error?: string;
  isLoading: boolean;
};
