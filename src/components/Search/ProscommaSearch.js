import React, { useState, useEffect } from 'react';

import useSearch from './useSearch';
import Progress from './Progress';
import TableMatches from './TableMatches';
import { Pagination } from '@material-ui/lab';

const limit = 5;

function ProscommaSearch({
  handleClose,
  searchText,
  referenceSelected,
  languageId,
  name,
  owner,
  goToBookChapterVerse,
  setSearch,
  setValue,
  dialog,
  book,
  handleClickWord,
}) {
  const { chapter, bookId, verse } = referenceSelected;

  const [verseCount, setVerseCount] = useState(0);
  const [page, setPage] = useState(1);

  const [tableVerse, setTableVerse] = React.useState([]);

  const lastIndex = page * limit;
  const firstIndex = lastIndex - limit;

  const { verseObjects } = useSearch({
    /** TODO Как написать этот компонент, чтобы он брал массив книг и возвращал массив 
    verseObjects, в котором не одна книга , а несколько. Если надо, я перепишу всё заново. */
    languageId,
    name,
    owner,
    bookId,
    chapter,
    searchText,
  });

  useEffect(() => {
    setVerseCount(Object.keys(verseObjects).length);
  }, [verseObjects]);

  const handleClick = (chapter, verse) => {
    setValue('');
    goToBookChapterVerse(bookId, chapter, verse);

    setSearch(null);

    handleClose();
  };
  React.useEffect(() => {
    if (verseObjects) {
      let table = [];
      for (let key in verseObjects) {
        const { keyChapter, keyVerse, match } = verseObjects[key];
        const tokens = verseObjects[key].tokens.map((tok) => {
          return (
            <span
              style={match.includes(tok.payload) ? { color: 'blue' } : null}
              key={tok.index}
              onClick={() => handleClickWord(tok.payload)}
            >
              {tok.payload}
            </span>
          );
        });

        table.push({ keyChapter, keyVerse, tokens, bookId });
      }

      setTableVerse(table);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verseObjects, chapter, verse]);
  const count = Math.ceil(verseCount / limit);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <div>
        <div>
          {Object.keys(verseObjects).length ? ( //**TODO здесь нужно проверку на null , чтобы не делать бесконечную
            // крутилку, Если не будет совпадений. Как вариант - я в useSearch возвращаю matches -кол-во слов совпадений, можно к нему прицепиться */
            <>
              <div
                style={{
                  display: 'flex',

                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',

                    height: '300px',
                  }}
                >
                  <div style={{ fontWeight: 'bold', marginTop: '10px' }}>
                    {`There are ${
                      Object.keys(verseObjects).length
                    } matches  for the "${searchText}":`}
                  </div>
                  <br />
                  <div style={{ marginTop: '10px' }}>
                    <TableMatches
                      tableVerse={tableVerse}
                      firstIndex={firstIndex}
                      lastIndex={lastIndex}
                      handleClick={handleClick}
                    />
                  </div>

                  {Object.keys(verseObjects).length > 3 ? (
                    <div
                      style={{
                        paddingTop: '10px',
                        flexGrow: '1',
                        margin: '0 auto',
                      }}
                    >
                      <Pagination
                        count={count}
                        color="primary"
                        page={page}
                        onChange={handleChange}
                        variant="outlined"
                        shape="rounded"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </>
          ) : (
            <Progress />
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProscommaSearch);
