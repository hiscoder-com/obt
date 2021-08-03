import React, { useContext, useEffect, useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { ResourcesContext } from 'scripture-resources-rcl';
import { BibleBookList as BibleBookListRCL } from '@texttree/tt-reference-rcl';

import { AppContext } from '../../context/AppContext';
import { ReferenceContext } from '../../context/ReferenceContext';
import { bibleList, singleChaptersBookID } from '../../config/base';

import { useStyles, useBookStyles } from './style';

function BookList() {
  const { state } = useContext(ResourcesContext);
  const {
    state: { appConfig },
    actions: { setShowBookSelect, setShowChapterSelect },
  } = useContext(AppContext);

  const {
    state: { referenceSelected },
    actions: { goToBookChapterVerse, applyBooksFilter },
  } = useContext(ReferenceContext);

  const showOBS = appConfig.filter((el) => el.i.split('_')[1] === 'obs').length > 0;

  const onBook = (identifier) => {
    setShowBookSelect(false);

    goToBookChapterVerse(identifier ?? null, '1', '1');
    !singleChaptersBookID.includes(identifier)
      ? setShowChapterSelect(true)
      : setShowChapterSelect(false);
  };

  const currentBibleList = JSON.parse(JSON.stringify(bibleList));
  const { t } = useTranslation();
  const classes = useStyles();
  const bookClasses = useBookStyles();

  const availableBookList = useMemo(() => [], []);

  if (state.resources.length > 0) {
    state.resources.forEach((resource) => {
      resource.projects.map((project) => availableBookList.push(project.identifier));
    });
  }

  useEffect(() => {
    applyBooksFilter(availableBookList);
  }, [availableBookList, applyBooksFilter]);

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
