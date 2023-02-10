import { Favourite } from 'domains';

export const isFavouriteArray = (data?: unknown): data is Favourite[] => {
  return true;
};
