import React, { useMemo } from 'react';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
function ListIcon({ items, itemIndex, listWordsBook, setAnchorEl }) {
  const listIcon = useMemo(
    () =>
      items &&
      items[itemIndex] &&
      listWordsBook &&
      listWordsBook[items[itemIndex]?.TWLink].length > 1 && (
        <ListAltRoundedIcon
          onClick={(event) => setAnchorEl(event.currentTarget)}
          color="primary"
        />
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [itemIndex, items, listWordsBook]
  );
  return <div>{listIcon}</div>;
}

export default ListIcon;
