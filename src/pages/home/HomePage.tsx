import React from 'react';
import { Header, Table } from 'components';
import { Container } from './styles';
import Alert from '@mui/material/Alert';
import { useHomePageContext } from 'contexts';

export const HomePage = React.memo(() => {
  const { error, searchMovie } = useHomePageContext();

  return (
    <Container>
      <Header />
      {!error && searchMovie && (
        <>
          {searchMovie.results.length === 0 && <Alert severity="error">No data</Alert>}
          {searchMovie?.results.length > 0 && <Table searchMovie={searchMovie} />}
        </>
      )}
    </Container>
  );
});

export default HomePage;
