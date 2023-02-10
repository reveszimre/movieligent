import React, { useCallback } from 'react';
import MaterialTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Card } from '../card';
import { Movie, SearchMovie } from 'domains';
import { FavIcon } from './styles';
import { useHomePageContext } from 'contexts';
import { Pagination } from './pagination';

export const Table = React.memo(({ searchMovie }: { searchMovie: SearchMovie }) => {
  const { addFavourite, favourites, removeFavourite } = useHomePageContext();

  const handleFavourite = useCallback(
    (movie: Movie) => {
      if (favourites.find((it) => it.id === movie.id)) {
        return removeFavourite(movie.id);
      }
      addFavourite({
        id: movie.id,
        title: movie.title,
      });
    },
    [addFavourite, favourites, removeFavourite],
  );

  const composeOverviewText = useCallback((text: string) => {
    if (text.length <= 50) {
      return text;
    }
    return `${text.substring(0, 50)}...`;
  }, []);

  return (
    <>
      {searchMovie && (
        <Card>
          {searchMovie.results.length > 0 && (
            <>
              <Pagination page={searchMovie.page} searchValue={searchMovie.searchValue} totalPage={searchMovie.total_pages} />
              <TableContainer>
                <MaterialTable sx={{ width: '500px' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Favourite</TableCell>
                      <TableCell>ID</TableCell>
                      <TableCell>Adult</TableCell>
                      <TableCell>Backdrop path</TableCell>
                      <TableCell>GenreIds</TableCell>
                      <TableCell>Original language</TableCell>
                      <TableCell>Original title</TableCell>
                      <TableCell>Overview</TableCell>
                      <TableCell>Popularity</TableCell>
                      <TableCell>Poster path</TableCell>
                      <TableCell>Release date</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Video</TableCell>
                      <TableCell>Vote average</TableCell>
                      <TableCell>Vote count</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {searchMovie.results.map((row) => (
                      <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          <FavIcon onClick={() => handleFavourite(row)} disabled={favourites.some((it) => it.id === row.id)} />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.adult.toString()}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.backdrop_path}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.genre_ids}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.original_language}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.original_title}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {composeOverviewText(row.overview)}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.popularity}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.poster_path}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.release_date}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.title}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.video.toString()}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.vote_average}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.vote_count}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </MaterialTable>
              </TableContainer>
            </>
          )}
        </Card>
      )}
    </>
  );
});
