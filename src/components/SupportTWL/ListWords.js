import React, { useState } from 'react';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import { Box, Popover } from '@material-ui/core';

function ListWords({ list }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box display={'flex'} justifyContent={'center'}>
        <ListAltRoundedIcon
          onClick={(event) => setAnchorEl(event.currentTarget)}
          color="primary"
        />
      </Box>
      <Popover
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
      ></Popover>
    </>
  );
}

export default ListWords;
