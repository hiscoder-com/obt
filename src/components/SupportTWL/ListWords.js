import React, { useContext, useState } from 'react';

import { Box, Popover } from '@material-ui/core';
import { ReferenceContext } from '../../context';
import ListLink from './ListLink';
import ListIcon from './ListIcon';

function ListWords({ items, itemIndex, listWordsBook, bookId }) {
  const {
    state: { referenceSelected },
    actions: { goToBookChapterVerse },
  } = useContext(ReferenceContext);

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
          goToBookChapterVerse={goToBookChapterVerse}
          setAnchorEl={setAnchorEl}
          referenceSelected={referenceSelected}
        />
      </Popover>
    </>
  );
}

export default ListWords;
