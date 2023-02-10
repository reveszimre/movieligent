import React from 'react';
import GradeIcon from '@mui/icons-material/Grade';
import { useHomePageContext } from 'contexts';

export const Favourites = React.memo(() => {
  const { favourites } = useHomePageContext();
  console.log(favourites);
  const isDisabled = favourites.length === 0;

  return <GradeIcon color="disabled" onClick={() => {}} style={{ cursor: 'pointer', ...(isDisabled && { pointerEvents: 'none' }) }} />;
});
