import React from 'react';
import GradeIcon from '@mui/icons-material/Grade';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { useHomePageContext } from 'contexts';

export const Favourites = React.memo(() => {
  const { favourites } = useHomePageContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isDisabled = favourites.length === 0;

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{ ml: 2 }}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        style={{ ...(isDisabled && { pointerEvents: 'none' }) }}
      >
        <GradeIcon onClick={() => {}} style={{ color: isDisabled ? 'grey' : 'yellow', cursor: 'pointer' }} />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {favourites.map((it) => (
          <MenuItem disabled>{it.title}</MenuItem>
        ))}
      </Menu>
    </>
  );
});
