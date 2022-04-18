import { Link } from '@material-ui/core';
import React, { useMemo } from 'react';

function ListLink({
  items,
  itemIndex,
  listWordsBook,
  bookId,
  goToBookChapterVerse,
  setAnchorEl,
  referenceSelected,
}) {
  const currentReference = (reference) => {
    if (
      reference[0].toString() === referenceSelected.chapter.toString() &&
      reference[1].toString() === referenceSelected.verse.toString()
    ) {
      return true;
    } else return false;
  };
  const handleClick = (reference) => {
    goToBookChapterVerse(bookId, reference[0], reference[1]);
    setAnchorEl(null);
  };
  const listReference = useMemo(
    () =>
      items &&
      items[itemIndex] &&
      listWordsBook[items[itemIndex]?.TWLink].map((el, index) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [itemIndex, items, listWordsBook]
  );
  return <div>{listReference}</div>;
}

export default ListLink;
