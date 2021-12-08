import React from 'react';
import DrawerUI from './DrawerUI';

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
  const { chapter, bookId } = referenceSelected;
  const { verseObjects, matches, search } = useSearch({
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verseObjects]);
  // console.log(findVerse);

  return (
    <div>
      <DrawerUI open={open} onClose={handleClose}>
        <div style={{ fontWeight: 'bold' }}>{`Finded ${
          Object.keys(verseObjects).length
        } verses and ${matches ? matches.length : 0} matches for the "${search}":`}</div>
        <br />
        {verseObjects ? findVerse : 'No content'}
      </DrawerUI>
    </div>
  );
}

export default React.memo(ProscommaSearch);
