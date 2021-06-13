import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';

import { BibleChapterList as BibleChapterListRCL } from '@texttree/tt-reference-rcl';
import { AppContext } from '../../App.context';

import useStyles, { useButtonStyles } from './style';

function ChapterList({ setReferenceSelected, referenceSelected, onClose }) {
  const { state } = useContext(AppContext);
  const { t } = useTranslation();
  const classes = useStyles();
  const chapterClasses = useButtonStyles();
  const onClickChapter = (chapterId) => {
    setReferenceSelected({ ...referenceSelected, chapter: chapterId, verse: 1 });
    onClose();
  };
  return (
    <BibleChapterListRCL
      chapterClasses={chapterClasses}
      selectedChapter={referenceSelected.chapter}
      bookId={state.resources.length > 0 ? referenceSelected.bookId : ''}
      chapterPrefix={referenceSelected.bookId === 'psa' ? t('Psalm') : t('Chapter')}
      onClickChapter={onClickChapter}
      chapterListClasses={classes}
    />
  );
}

export default ChapterList;
