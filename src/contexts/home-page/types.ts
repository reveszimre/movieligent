import { Favourite, SearchMovie } from 'domains';
import { useFavouritesHook } from 'hooks';

export type IContext = {
  getData: (p: { page?: number; query: string }) => void;
  searchMovie?: SearchMovie;
  setSearchMovie: (s?: SearchMovie) => void;
  error?: string;
  isLoading: boolean;
} & ReturnType<typeof useFavouritesHook>;
