import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';
import { BibleBookList as BibleBookListRCL } from '@texttree/tt-reference-rcl';

import { AppContext } from '../../context/AppContext';
import { ReferenceContext } from '../../context/ReferenceContext';
import { bibleList, singleChaptersBookID } from '../../config/base';

import { useStyles, useBookStyles } from './style';

function BookList() {
  const {
    actions: { setShowBookSelect, setShowChapterSelect },
  } = useContext(AppContext);

  const {
    state: { referenceSelected },
    actions: { goToBookChapterVerse, getFilteredBookList },
  } = useContext(ReferenceContext);

  const onBook = (identifier) => {
    setShowBookSelect(false);

    goToBookChapterVerse(identifier ?? null, '1', '1');
    !singleChaptersBookID.includes(identifier)
      ? setShowChapterSelect(true)
      : setShowChapterSelect(false);
  };

  const { t } = useTranslation();
  const classes = useStyles();
  const bookClasses = useBookStyles();

  const titleBooks = {};
  // TODO можно попробовать использовать getFilteredBookList. у него в поле name есть название на нужном языке (русский или англ)
  bibleList.forEach((el) => (titleBooks[el.identifier] = t(el.identifier)));

  const availableBookList = getFilteredBookList().map((el) => el.key);

  return (
    <>
      <BibleBookListRCL
        titleBooks={titleBooks}
        availableBookList={availableBookList}
        labelForCheckbox={t('existing_books')}
        showCheckbox={true}
        showInactive={true}
        sortFirstNT={true}
        selectedBookId={referenceSelected.bookId}
        onClickBook={(bookId) => onBook(bookId)}
        titleOBS={t('Bible_OBS')}
        titleNT={t('Bible_NT')}
        BibleBookListClasses={classes}
        bookClasses={bookClasses}
      />
    </>
  );
}

export default BookList;
