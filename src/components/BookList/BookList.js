import React, { useContext, useState } from 'react';

import { AppContext } from '../../App.context';
import { ResourcesContext } from 'scripture-resources-rcl';
import { BookList as BookListRCL } from 'demo-bsa-reference-rcl';

import { FormControlLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { useTranslation } from 'react-i18next';
import { bibleList } from '../../config';

import { useStyles, useBookStyles } from './style';

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
      chapter: '1',
      verse: 1,
    });
    setShowChapterSelect(true);
  };

  const [checkState, setCheckState] = useState(false);
  const classes = useStyles();
  const bookClasses = useBookStyles();
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

  const renderBookList = (categories) => {
    return currentBibleList
      .filter((el) =>
        checkState
          ? el.categories === categories && el.isset
          : el.categories === categories
      )
      .map((el) => {
        return { ...el, text: t(el.identifier) };
      });
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
      <BookListRCL
        title={t('bible_NT')}
        bookList={renderBookList('bible-nt')}
        bookClasses={bookClasses}
        bookListClassName={classes.bookGrid}
        selectedBookId={referenceSelected.bookId}
        onClickBook={(bookId) => onBook(bookId)}
      />
      <BookListRCL
        title={t('bible_OT')}
        bookList={renderBookList('bible-ot')}
        bookClasses={bookClasses}
        bookListClassName={classes.bookGrid}
        selectedBookId={referenceSelected.bookId}
        onClickBook={(bookId) => onBook(bookId)}
      />
    </>
  );
}

export default BookList;
