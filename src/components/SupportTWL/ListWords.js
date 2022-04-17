import React, { useContext, useMemo, useState } from 'react';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import { Box, Link, Popover } from '@material-ui/core';
import { ReferenceContext } from '../../context';

function ListWords({ items, itemIndex, listWordsBook, bookId }) {
  const {
    state: { referenceSelected },
    actions: { goToBookChapterVerse },
  } = useContext(ReferenceContext);
  const currentReference = (reference) => {
    if (
      reference[0].toString() === referenceSelected.chapter.toString() &&
      reference[1].toString() === referenceSelected.verse.toString()
    ) {
      return true;
    } else return false;
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (reference) => {
    goToBookChapterVerse(bookId, reference[0], reference[1]);
    setAnchorEl(null);
  };
  const listIcon = useMemo(
    () =>
      items &&
      items[itemIndex] &&
      listWordsBook &&
      listWordsBook[items[itemIndex].TWLink] &&
      listWordsBook[items[itemIndex].TWLink].length > 1 && (
        <ListAltRoundedIcon
          onClick={(event) => setAnchorEl(event.currentTarget)}
          color="primary"
        />
      ),
    [itemIndex, items, listWordsBook]
  );
  console.log(listWordsBook[items[itemIndex].TWLink]);
  const listReference = useMemo(
    () =>
      items &&
      items[itemIndex] &&
      listWordsBook[items[itemIndex].TWLink] &&
      listWordsBook[items[itemIndex].TWLink].map((el, index) => {
        const reference = el.split(':');
        return (
          <div
            key={index}
            style={{
              paddingTop: '5px',
              paddingBottom: '5px',
              paddingLeft: '15px',
              paddingRight: '15px',
            }}
          >
            <Link
              onClick={() => handleClick(reference)}
              color={currentReference(reference) ? 'textSecondary' : 'primary'}
              disabled={currentReference(reference)}
              key={el}
            >
              {el}
            </Link>
          </div>
        );
      }),
    [currentReference, handleClick, itemIndex, items, listWordsBook]
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
