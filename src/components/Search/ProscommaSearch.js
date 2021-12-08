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
  goToBookChapterVerse,
}) {
  const { chapter, bookId, verse } = referenceSelected;
  const { verseObjects } = useSearch({
    languageId,
    name,
    owner,
    bookId,
    chapter,
    searchText: searchText,
    usfm,
  });
  const [findVerse, setFindVerse] = React.useState('');
  const handleClick = (chapter, verse) => {
    console.log('глава', chapter, 'стих', verse);
    goToBookChapterVerse(bookId, chapter, verse);
  };
  React.useEffect(() => {
    if (verseObjects) {
      console.log('data', verseObjects);
      let find = [];
      for (let key in verseObjects) {
        const { keyChapter, keyVerse, match } = verseObjects[key];
        const tokens = verseObjects[key].tokens.map((tok) => {
          return (
            <span
              style={match.includes(tok.payload) ? { color: 'blue' } : null}
              key={tok.index}
            >
              {tok.payload}
            </span>
          );
        });

        find.push(
          <div key={key} onClick={() => handleClick(keyChapter, keyVerse)}>
            {`${keyChapter}:${keyVerse} - `}
            {tokens}
          </div>
        );
      }
      setFindVerse(find);
    }
  }, [verseObjects]);
  // console.log(findVerse);

  return (
    <div>
      <DialogUI open={open} onClose={handleClose}>
        {verseObjects ? findVerse : 'No content'}
      </DialogUI>
    </div>
  );
}

export default React.memo(ProscommaSearch);
