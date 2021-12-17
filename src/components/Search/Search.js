import React, { useState, useEffect } from 'react';

import useSearch from './useSearch';
import { Progress, TableMatches } from '..';

import { Pagination } from '@material-ui/lab';
import { useStyles } from './style';

const limitVersesOnPage = 5;

function Search({
  handleCloseDialogUI,
  searchText,
  referenceSelected,
  resourceSearch,
  goToBookChapterVerse,
  setSearch,
  setValue,
  handleClickWord,
  clickOnWord,
}) {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [versesCount, setVersesCount] = useState(0);
  const [tableVerse, setTableVerse] = useState([]);

  const { chapter, bookId, verse } = referenceSelected;

  const classes = useStyles();
  const lastIndex = page * limitVersesOnPage;
  const firstIndex = lastIndex - limitVersesOnPage;
  const { verseObjects, matches } = useSearch({
    resourceSearch,
    referenceSelected,
    searchText,
  });

  const handlePagination = (event, value) => {
    setPage(value);
  };

  const handleClickVerse = (chapter, verse) => {
    setValue('');
    goToBookChapterVerse(bookId, chapter, verse);
    setSearch(null);
    handleCloseDialogUI();
  };

  useEffect(() => {
    if (verseObjects) {
      let table = [];
      for (let key in verseObjects) {
        const { keyChapter, keyVerse, match } = verseObjects[key];
        const tokens = verseObjects[key].tokens.map((tok) => {
          return (
            <span
              className={`word ${match.includes(tok.payload) ? 'matched' : ''}${
                clickOnWord ? ' clickable' : ''
              }`}
              key={tok.index}
              onClick={() => clickOnWord && handleClickWord(tok.payload)}
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
  }, [verseObjects, chapter, verse, clickOnWord]);

  useEffect(() => {
    setPages(Math.ceil(versesCount / limitVersesOnPage));
  }, [versesCount]);

  useEffect(() => {
    setVersesCount(Object.keys(verseObjects).length);
  }, [verseObjects]);

  const tableMatches = (
    <>
      <div className={classes.tableMatches}>
        <TableMatches
          tableVerse={tableVerse}
          firstIndex={firstIndex}
          lastIndex={lastIndex}
          handleClickVerse={handleClickVerse}
        />
      </div>

      {Object.keys(verseObjects).length > 3 ? (
        <div className={classes.pagination}>
          <Pagination
            count={pages}
            color="primary"
            page={page}
            onChange={handlePagination}
            variant="outlined"
            shape="rounded"
          />
        </div>
      ) : null}
    </>
  );

  return (
    <div>
      {matches ? (
        <>
          <div className={classes.wrapperMatchesBlock}>
            <div className={classes.matchesResultString}>
              {`There are ${
                matches?.length > 0 ? Object.keys(verseObjects).length : 'no'
              } matches  for the "${searchText}":`}
            </div>
            <br />
            {matches?.length > 0 ? tableMatches : null}
          </div>
        </>
      ) : (
        <Progress />
      )}
    </div>
  );
}

export default React.memo(Search);
