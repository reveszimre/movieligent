import React, { PropsWithChildren } from 'react';
import { Container } from './styles';

export const Card = React.memo(({ children }: PropsWithChildren) => {
  return <Container>{children}</Container>;
});
