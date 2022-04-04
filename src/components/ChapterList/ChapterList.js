import React, { useContext } from 'react';

import { BibleChapterList as BibleChapterListRCL } from '@texttree/tt-reference-rcl';
import { useTranslation } from 'react-i18next';

import { AppContext, ReferenceContext } from '../../context';

import useStyles, { useButtonStyles } from './style';

function ChapterList({ onClose }) {
  const {
    state: { appConfig, breakpoint },
  } = useContext(AppContext);

  const {
    state: { referenceSelected },
    actions: { goToBookChapterVerse },
  } = useContext(ReferenceContext);

  const { bookId, chapter } = referenceSelected;

  const { t } = useTranslation();
  const classes = useStyles();
  const chapterClasses = useButtonStyles();
  const onClickChapter = (chapterId) => {
    goToBookChapterVerse(bookId, chapterId, '1');
    onClose();
  };

  return (
    <BibleChapterListRCL
      chapterClasses={chapterClasses}
      selectedChapter={chapter}
      bookId={appConfig[breakpoint.name].length > 0 ? bookId : ''}
      chapterPrefix={
        bookId === 'psa' ? t('Psalm') : bookId === 'obs' ? t('Story') : t('Chapter')
      }
      onClickChapter={onClickChapter}
      chapterListClasses={classes}
    />
  );
}

export default ChapterList;
