import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';
import { ResourcesContext } from 'scripture-resources-rcl';
import { BibleBookList as BibleBookListRCL } from '@texttree/tt-reference-rcl';

import { AppContext } from '../../App.context';
import { bibleList, singleChaptersBookID } from '../../config';

import { useStyles, useBookStyles } from './style';

function BookList() {
  const { state } = useContext(ResourcesContext);
  const appContext = useContext(AppContext);
  const { referenceSelected } = appContext.state;
  const { setShowBookSelect, setReferenceSelected, setShowChapterSelect } =
    appContext.actions;

  const onBook = (identifier) => {
    setShowBookSelect(false);
    setReferenceSelected({
      bookId: identifier ?? null,
      chapter: '1',
      verse: 1,
    });
    !singleChaptersBookID.includes(identifier)
      ? setShowChapterSelect(true)
      : setShowChapterSelect(false);
  };
  let uniqueBookID = new Set();

  const currentBibleList = JSON.parse(JSON.stringify(bibleList));
  const { t } = useTranslation();
  const classes = useStyles();
  const bookClasses = useBookStyles();

  if (state.resources.length > 0) {
    state.resources.forEach((resource) => {
      resource.projects.map((project) => uniqueBookID.add(project.identifier));
    });
  }
  let availableBookList = Array.from(uniqueBookID);
  const titleBooks = {};
  currentBibleList.map((el) => (titleBooks[el.identifier] = t(el.identifier)));

  return (
    <>
      <BibleBookListRCL
        titleBooks={titleBooks}
        availableBookList={availableBookList}
        labelForCheckbox={t('existing_books')}
        showCheckbox={true}
        sortFirstNT={true}
        selectedBookId={referenceSelected.bookId}
        onClickBook={(bookId) => onBook(bookId)}
        titleOT={t('bible_OT')}
        titleNT={t('bible_NT')}
        BibleBookListClasses={classes}
        bookClasses={bookClasses}
      />
    </>
  );
}

export default BookList;
