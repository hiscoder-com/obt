import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';
import { BibleChapterList as BibleChapterListRCL } from '@texttree/tt-reference-rcl';

import { AppContext } from '../../App.context';

import useStyles, { useButtonStyles } from './style';

function ChapterList({ setReferenceSelected, referenceSelected, onClose }) {
  const {
    state: { appConfig },
  } = useContext(AppContext);
  const { t } = useTranslation();
  const classes = useStyles();
  const chapterClasses = useButtonStyles();
  const onClickChapter = (chapterId) => {
    setReferenceSelected({ ...referenceSelected, chapter: chapterId, verse: '1' });
    onClose();
  };
  return (
    <BibleChapterListRCL
      chapterClasses={chapterClasses}
      selectedChapter={referenceSelected.chapter}
      bookId={appConfig.length > 0 ? referenceSelected.bookId : ''}
      chapterPrefix={
        referenceSelected.bookId === 'psa'
          ? t('Psalm')
          : referenceSelected.bookId === 'obs'
          ? t('Story')
          : t('Chapter')
      }
      onClickChapter={onClickChapter}
      chapterListClasses={classes}
    />
  );
}

export default ChapterList;
