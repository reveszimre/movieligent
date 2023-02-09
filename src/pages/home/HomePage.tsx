import React from 'react';
import { Header, Table } from 'components';
import { Container } from './styles';
import Alert from '@mui/material/Alert';
import { useHomePageContext } from 'contexts';

export const HomePage = React.memo(() => {
  const { error, searchMovieValue } = useHomePageContext();

  return (
    <Container>
      <Header />
      {!error && searchMovieValue && (
        <>
          {searchMovieValue.results.length === 0 && <Alert severity="error">No data</Alert>}
          {searchMovieValue?.results.length > 0 && <Table searchMovieValue={searchMovieValue} />}
        </>
      )}
    </Container>
  );
});

export default HomePage;
