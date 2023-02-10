import { SearchMovieResponse } from './search-movie-response';

export interface SearchMovie extends SearchMovieResponse {
  searchValue: string;
}
