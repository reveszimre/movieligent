import { SearchMovie } from './search-movie';

export interface SearchMovieWithValue extends SearchMovie {
  searchValue: string;
}
