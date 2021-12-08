import React from 'react';

import { DialogUI } from '../DialogUI';
import useSearch from './useSearch';

function ProscommaSearch({
  usfm,
  open,
  handleClose,
  searchText,
  referenceSelected,
  languageId,
  name,
  owner,
}) {
  const { chapter, bookId } = referenceSelected;
  const { passages, tokens, data } = useSearch({
    languageId,
    name,
    owner,
    bookId,
    chapter,
    searchText: searchText,
    usfm,
  });
  const [findVerse, setFindVerse] = React.useState('');
  React.useEffect(() => {
    if (tokens && tokens.length > 0) {
      console.log('tokens', tokens);
      console.log('data', data);

      setFindVerse(
        tokens[0].tokens.map((el) => {
          return <span key={el.index}>{el.payload}</span>;
        })
      );
    }
  }, [tokens]);
  // console.log(findVerse);
  const findVerses =
    passages && passages.length > 0
      ? passages.map((e) => {
          return <span key={e.index}> {`${e.reference} ${e.text}`}</span>;
        })
      : null;

  return (
    <div>
      <DialogUI open={open} onClose={handleClose}>
        {tokens ? findVerse : 'No content'}
      </DialogUI>
    </div>
  );
}

export default React.memo(ProscommaSearch);
