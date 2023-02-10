import styled from 'styled-components';
import GradeIcon from '@mui/icons-material/Grade';

export const PaginationContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

export const FavIcon = styled(GradeIcon)<{ disabled: boolean }>`
  color: ${(p) => (p.disabled ? 'yellow' : 'grey')};
  cursor: pointer;
`;
