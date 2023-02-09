import React, { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';

export const Card = React.memo(({ children }: PropsWithChildren) => {
  return (
    <Box
      style={{
        backgroundColor: 'white',
        boxShadow: `gray 0 0 5px`,
        padding: '1vw',
      }}
    >
      {children}
    </Box>
  );
});
