import React, { useContext } from 'react';

import { AppContext } from '../../App.context';
import { ResourcesContext } from 'scripture-resources-rcl';
import { BibleBookList as BibleBookListRCL } from 'demo-bsa-reference-rcl';

import { useTranslation } from 'react-i18next';
import { bibleList } from '../../config';

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
  let uniqueBookID = new Set();

  const currentBibleList = JSON.parse(JSON.stringify(bibleList));
  const { t } = useTranslation();

  if (state.resources.length > 0) {
    state.resources.forEach((resource) => {
      resource.projects.map((project) => uniqueBookID.add(project.identifier));
    });
  }
  let availableBookList = Array.from(uniqueBookID);
  const titleBook = {};
  currentBibleList.map((el) => (titleBook[el.identifier] = t(el.identifier)));

  return (
    <>
      <BibleBookListRCL
        titleBook={titleBook}
        availableBookList={availableBookList}
        label={t('existing_books')}
        check={true}
        selectedBookId={referenceSelected.bookId}
        onClickBook={(bookId) => onBook(bookId)}
        allTestaments={true}
        titleOT={t('bible_OT')}
        titleNT={t('bible_NT')}
        showTitle={true}
      />
    </>
  );
}

export default BookList;
