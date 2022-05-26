import React, { useState } from 'react';

import { Box, Popover } from '@material-ui/core';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';

import { ListLinks } from '.';

function ListWords({ links }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box textAlign={'center'}>
        <ListAltRoundedIcon
          onClick={(event) => setAnchorEl(event.currentTarget)}
          color="inherit"
        />
      </Box>
      <Popover anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)}>
        <ListLinks links={links} onClose={handleClose} />
      </Popover>
    </>
  );
}

export default ListWords;
