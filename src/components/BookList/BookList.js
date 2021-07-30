import React, { useContext, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { ResourcesContext } from 'scripture-resources-rcl';
import { BibleBookList as BibleBookListRCL } from '@texttree/tt-reference-rcl';

import { AppContext } from '../../App.context';
import { bibleList, singleChaptersBookID } from '../../config/base';

import { useStyles, useBookStyles } from './style';

function BookList() {
  const { state } = useContext(ResourcesContext);
  const {
    state: { referenceSelected, appConfig },
    actions: {
      setShowBookSelect,
      setReferenceSelected,
      setShowChapterSelect,
      applyBooksFilter,
    },
  } = useContext(AppContext);
  const showOBS = appConfig.filter((el) => el.i.split('_')[1] === 'obs').length > 0;

  const onBook = (identifier) => {
    setShowBookSelect(false);
    setReferenceSelected({
      bookId: identifier ?? null,
      chapter: '1',
      verse: '1',
    });
    !singleChaptersBookID.includes(identifier)
      ? setShowChapterSelect(true)
      : setShowChapterSelect(false);
  };

  const currentBibleList = JSON.parse(JSON.stringify(bibleList));
  const { t } = useTranslation();
  const classes = useStyles();
  const bookClasses = useBookStyles();

  const availableBookList = [];
  if (state.resources.length > 0) {
    state.resources.forEach((resource) => {
      resource.projects.map((project) => availableBookList.push(project.identifier));
    });
  }
  useEffect(() => {
    applyBooksFilter(availableBookList);
  }, []); // just apply the first time in this demo

  const titleBooks = {};
  currentBibleList.map((el) => (titleBooks[el.identifier] = t(el.identifier)));

  return (
    <>
      <BibleBookListRCL
        titleBooks={titleBooks}
        availableBookList={availableBookList}
        labelForCheckbox={t('existing_books')}
        showCheckbox={!showOBS}
        showInactive={!showOBS}
        sortFirstNT={true}
        selectedBookId={referenceSelected.bookId}
        onClickBook={(bookId) => onBook(bookId)}
        titleOT={showOBS ? '' : t('Bible_OT')}
        titleOBS={showOBS ? '' : t('Bible_OBS')}
        titleNT={showOBS ? '' : t('Bible_NT')}
        BibleBookListClasses={classes}
        bookClasses={bookClasses}
        showOBS={showOBS}
      />
    </>
  );
}

export default BookList;
