import React, { useState, useEffect } from 'react';
import DrawerUI from './DrawerUI';
import { makeStyles } from '@material-ui/core/styles';

import useSearch from './useSearch';
import Progress from './Progress';
import { DialogUI } from '..';
import { Pagination } from '@material-ui/lab';
import Slider from '@material-ui/core/Slider';

function ProscommaSearch({
  open,
  handleClose,
  searchText,
  referenceSelected,
  languageId,
  name,
  owner,
  goToBookChapterVerse,
  setSearch,
  setValue,
}) {
  const { chapter, bookId, verse } = referenceSelected;

  const [verseCount, setVerseCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const lastIndex = page * limit;
  const firstIndex = lastIndex - limit;

  const useStyles = makeStyles((theme) => ({
    root: {
      height: theme.spacing(10),
    },
  }));

  const classes = useStyles();
  const { verseObjects, matches } = useSearch({
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

  const [findVerse, setFindVerse] = React.useState('');
  const handleClick = (chapter, verse) => {
    setValue('');
    goToBookChapterVerse(bookId, chapter, verse);

    setSearch(null);

    handleClose();
  };
  React.useEffect(() => {
    if (verseObjects) {
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
          <div
            className={
              keyChapter.toString() === chapter.toString() &&
              keyVerse.toString() === verse.toString()
                ? 'verse current'
                : 'verse'
            }
            key={key}
            onClick={() => handleClick(keyChapter, keyVerse)}
          >
            {`${keyChapter}:${keyVerse} - `}
            {tokens}
          </div>
        );
      }
      setFindVerse(find);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verseObjects, chapter, verse]);
  const count = Math.ceil(verseCount / limit);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleChangeSlider = (event, value) => {
    setLimit(value);
    setPage(1);
  };
  console.log({ limit });

  return (
    <div>
      <DialogUI open={open} onClose={handleClose} maxWidth={'lg'}>
        <div>
          {Object.keys(verseObjects).length ? (
            <>
              <div
                style={{
                  display: 'flex',

                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div>
                  <div style={{ fontWeight: 'bold' }}>
                    {`Finded ${Object.keys(verseObjects).length} verses and ${
                      matches ? matches.length : 0
                    } matches for the "${searchText}":`}
                  </div>
                  <br />
                  {verseObjects ? findVerse.slice(firstIndex, lastIndex) : 'No content'}

                  {Object.keys(verseObjects).length > 3 ? (
                    <div>
                      <Pagination
                        count={count}
                        color="primary"
                        page={page}
                        onChange={handleChange}
                      />
                    </div>
                  ) : null}
                </div>
                {Object.keys(verseObjects).length > 3 ? (
                  <>
                    <div>Verses on page</div>
                    <div className={classes.root}>
                      <Slider
                        orientation="vertical"
                        aria-labelledby="vertical-slider"
                        step={2}
                        track={false}
                        marks={[
                          { value: 3, label: '3' },
                          { value: 5, label: '5' },
                          { value: 7, label: '7' },
                          { value: 9, label: '9' },
                        ]}
                        min={3}
                        max={9}
                        onChange={handleChangeSlider}
                        defaultValue={5}
                      />
                    </div>
                  </>
                ) : null}
              </div>
            </>
          ) : (
            <Progress />
          )}
        </div>
      </DialogUI>
    </div>
  );
}

export default React.memo(ProscommaSearch);
