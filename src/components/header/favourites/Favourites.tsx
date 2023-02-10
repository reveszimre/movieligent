import React, { useCallback } from 'react';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { useHomePageContext } from 'contexts';
import { FavIcon } from './styles';

export const Favourites = React.memo(() => {
  const { favourites, removeFavourite } = useHomePageContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const isDisabled = favourites.length === 0;

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const onMenuItemClick = useCallback(
    (id: string) => {
      removeFavourite(id);
      handleClose();
    },
    [handleClose, removeFavourite],
  );

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
        <FavIcon disabled={isDisabled} />
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
          <MenuItem key={it.id} onClick={() => onMenuItemClick(it.id)}>
            {it.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
});
