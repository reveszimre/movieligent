import styled from 'styled-components';
import GradeIcon from '@mui/icons-material/Grade';

export const FormElements = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1vw;
`;

export const FavIcon = styled(GradeIcon)<{ disabled: boolean }>`
  color: ${(p) => (p.disabled ? 'grey' : 'yellow')};
  cursor: 'pointer';
`;
