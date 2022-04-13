import React, { useState } from 'react';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import { Box, Popover } from '@material-ui/core';

function ListWords({ items, itemIndex, tsvs }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const list = [];

  if (tsvs) {
    Object.entries(tsvs).forEach(([key, chapters]) => {
      Object.entries(chapters).forEach(([key, verses]) => {
        verses.forEach((verse) => {
          const el = verse.TWLink;
          list.push({ el: verse.TWLink });
        });
      });
    });
  }
  console.log(list);
  return (
    <>
      <Box display={'flex'} justifyContent={'center'}>
        <ListAltRoundedIcon
          onClick={(event) => setAnchorEl(event.currentTarget)}
          color="primary"
        />
      </Box>
      <Popover anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)}>
        {items && itemIndex && items[itemIndex].TWLink}
      </Popover>
    </>
  );
}

export default ListWords;
