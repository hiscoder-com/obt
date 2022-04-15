import React, { useContext, useEffect, useMemo, useState } from 'react';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import { Box, Popover } from '@material-ui/core';
import { ReferenceContext } from '../../context';

function ListWords({ items, itemIndex, listWords }) {
  const {
    actions: { setReferenceBlock, goToBookChapterVerse },
  } = useContext(ReferenceContext);

  const [anchorEl, setAnchorEl] = useState(null);
  // const [listWords, setListWords] = useState();
  const handleClose = () => {
    setAnchorEl(null);
  };

  const listIcon = useMemo(
    () =>
      items &&
      items[itemIndex] &&
      listWords &&
      listWords[items[itemIndex].TWLink] &&
      listWords[items[itemIndex].TWLink].length > 1 && (
        <ListAltRoundedIcon
          onClick={(event) => setAnchorEl(event.currentTarget)}
          color="primary"
        />
      ),
    [itemIndex, items, listWords]
  );
  const listReference = useMemo(
    () =>
      items &&
      items[itemIndex] &&
      listWords[items[itemIndex].TWLink] &&
      listWords[items[itemIndex].TWLink].map((el) => {
        return (
          <p style={{ paddingLeft: '15px', paddingRight: '15px' }} key={el}>
            {el}
          </p>
        );
      }),
    [itemIndex, items, listWords]
  );

  return (
    <>
      <Box display={'flex'} justifyContent={'center'}>
        {listIcon}
      </Box>
      <Popover anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)}>
        {listReference}
      </Popover>
    </>
  );
}

export default ListWords;
