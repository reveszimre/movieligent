import React, { useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { PaginationContainer } from './styles';
import { useHomePageContext } from 'contexts';

export const Pagination = React.memo(({ page, searchValue, totalPage }: { page: number; searchValue: string; totalPage: number }) => {
  const { getData } = useHomePageContext();

  const fetchPage = useCallback(
    (page: number) => {
      getData({ page, query: searchValue });
    },
    [getData, searchValue],
  );

  return (
    <PaginationContainer>
      <IconButton onClick={() => fetchPage(0)} disabled={page === 1} aria-label="first page">
        <FirstPageIcon />
      </IconButton>
      <IconButton onClick={() => fetchPage(page - 1)} disabled={page === 1} aria-label="previous page">
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton onClick={() => fetchPage(page + 1)} disabled={page === totalPage} aria-label="next page">
        <KeyboardArrowRight />
      </IconButton>
      <IconButton onClick={() => {}} disabled={page === totalPage} aria-label="last page">
        <LastPageIcon />
      </IconButton>
      {`${page} / ${totalPage}`}
    </PaginationContainer>
  );
});
