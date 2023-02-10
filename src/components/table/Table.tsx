import React, { useCallback } from 'react';
import MaterialTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import GradeIcon from '@mui/icons-material/Grade';
import { Card } from '../card';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Movie, SearchMovie } from 'domains';
import { PaginationContainer } from './styles';
import { useHomePageContext } from 'contexts';

export const Table = React.memo(({ searchMovie }: { searchMovie: SearchMovie }) => {
  const { addFavourite, favourites, removeFavourite, getData } = useHomePageContext();

  const fetchPage = useCallback(
    (page: number) => {
      getData({ page, query: searchMovie.searchValue });
    },
    [getData, searchMovie.searchValue],
  );

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
    return `${text.substring(1, 50)}...`;
  }, []);

  return (
    <>
      {searchMovie && (
        <Card>
          {searchMovie.results.length > 0 && (
            <>
              <PaginationContainer>
                <IconButton onClick={() => fetchPage(0)} disabled={searchMovie.page === 1} aria-label="first page">
                  <FirstPageIcon />
                </IconButton>
                <IconButton onClick={() => fetchPage(searchMovie.page - 1)} disabled={searchMovie.page === 1} aria-label="previous page">
                  <KeyboardArrowLeft />
                </IconButton>
                <IconButton
                  onClick={() => fetchPage(searchMovie.page + 1)}
                  disabled={searchMovie.page === searchMovie.total_pages}
                  aria-label="next page"
                >
                  <KeyboardArrowRight />
                </IconButton>
                <IconButton onClick={() => {}} disabled={searchMovie.page === searchMovie.total_pages} aria-label="last page">
                  <LastPageIcon />
                </IconButton>
              </PaginationContainer>
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
                          <GradeIcon
                            onClick={() => handleFavourite(row)}
                            style={{ cursor: 'pointer', color: favourites.find((it) => it.id === row.id) ? 'yellow' : 'grey' }}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.adult}
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
                        <TableCell component="th" scope="row" style={{ whiteSpace: 'nowrap' }}>
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
                          {row.video}
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
