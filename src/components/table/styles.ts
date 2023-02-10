import styled from 'styled-components';
import GradeIcon from '@mui/icons-material/Grade';

export const FavIcon = styled(GradeIcon)<{ disabled: boolean }>`
  color: ${(p) => (p.disabled ? 'yellow' : 'grey')};
  cursor: pointer;
`;
