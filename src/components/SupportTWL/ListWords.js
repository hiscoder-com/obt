import React, { useState } from 'react';

import { Box, Popover } from '@material-ui/core';

import { ListIcon, ListLink } from '.';

function ListWords({ items, itemIndex, listWordsBook, bookId }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box display={'flex'} justifyContent={'center'}>
        <ListIcon
          items={items}
          itemIndex={itemIndex}
          listWordsBook={listWordsBook}
          setAnchorEl={setAnchorEl}
        />
      </Box>
      <Popover anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)}>
        <ListLink
          items={items}
          itemIndex={itemIndex}
          listWordsBook={listWordsBook}
          bookId={bookId}
          setAnchorEl={setAnchorEl}
        />
      </Popover>
    </>
  );
}

export default ListWords;
