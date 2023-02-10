import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Card } from '../card';
import { useHomePageContext } from 'contexts';
import { Container, Controls } from './styles';
import Alert from '@mui/material/Alert';
import { Form } from './form';
import { Favourites } from './favourites';

export const Header = React.memo(() => {
  const { error, isLoading } = useHomePageContext();

  return (
    <Card>
      <Container>
        <Controls>
          <Form />
          <Favourites />
        </Controls>
        {isLoading && <CircularProgress color="primary" />}
        {error && !isLoading && <Alert severity="error">{error}</Alert>}
      </Container>
    </Card>
  );
});
