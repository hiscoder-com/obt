import React, { useContext, useState } from 'react';

import { AppContext } from '../../App.context';
import { ResourcesContext } from 'scripture-resources-rcl';

import { Button, FormControlLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { useTranslation } from 'react-i18next';
import { bibleList } from '../../config';

import { useStyles } from './style';

const trueBibleList = JSON.parse(
  JSON.stringify(bibleList.map((item) => ({ ...item, isset: true })))
);

function BookList() {
  const { state } = useContext(ResourcesContext);
  const appContext = useContext(AppContext);
  const { referenceSelected } = appContext.state;
  const {
    setShowBookSelect,
    setReferenceSelected,
    setShowChapterSelect,
  } = appContext.actions;

  const onBook = (identifier) => {
    setShowBookSelect(false);
    setReferenceSelected({
      bookId: identifier ?? null,
      chapter: 1,
      verse: 1,
    });
    setShowChapterSelect(true);
  };

  const [checkState, setCheckState] = useState(false);
  const classes = useStyles();
  const currentBibleList = JSON.parse(JSON.stringify(bibleList));
  const { t } = useTranslation();
  const handleChange = () => {
    setCheckState((prev) => !prev);
  };

  if (state.resources.length > 0) {
    state.resources.forEach((resource) => {
      const identifiers = resource.projects.map((project) => project.identifier);
      currentBibleList.forEach((item) => {
        if (item.isset || identifiers.includes(item.identifier)) {
          item.isset = true;
        }
      });
    });
  }

  const issetCheck = JSON.stringify(currentBibleList) !== JSON.stringify(trueBibleList);

  const currentBook = (el, color = 'primary') => {
    return (
      <Button color={color} onClick={() => onBook(el.identifier)}>
        {t(el.identifier)}
      </Button>
    );
  };

  const renderBookList = (categories) => {
    return currentBibleList
      .filter((el) =>
        checkState
          ? el.categories === categories && el.isset === true
          : el.categories === categories
      )
      .map((el) => (
        <div className={classes.bookWrap} key={el.sort}>
          {el.isset ? (
            el.identifier === referenceSelected.bookId ? (
              currentBook(el, 'secondary')
            ) : (
              currentBook(el)
            )
          ) : (
            <Button disabled>{t(el.identifier)}</Button>
          )}
        </div>
      ));
  };
  const hideCheckRender = issetCheck ? (
    <FormControlLabel
      control={
        <Checkbox
          checked={checkState}
          onChange={handleChange}
          name="checkedA"
          color="primary"
        />
      }
      label={t('existing_books')}
    />
  ) : (
    []
  );

  return (
    <>
      {hideCheckRender}
      <h2>{t('bible_NT')}</h2>
      <div className={classes.bookGrid}>{renderBookList('bible-nt')}</div>
      <h2>{t('bible_OT')}</h2>
      <div className={classes.bookGrid}>{renderBookList('bible-ot')}</div>
    </>
  );
}

export default BookList;
