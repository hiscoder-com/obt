import React from 'react';
import { useTranslation } from 'react-i18next';
import { BibleChapterList as BibleChapterListRCL } from 'demo-bsa-reference-rcl';

import useStyles from './style';

function ChapterList({ setReferenceSelected, referenceSelected, onClose }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const onClickChapter = (chapterId) => {
    setReferenceSelected({ ...referenceSelected, chapter: chapterId, verse: 1 });
    onClose();
  };
  return (
    <BibleChapterListRCL
      selectedChapter={referenceSelected.chapter}
      bookId={referenceSelected.bookId}
      text={t('Chapter')}
      onClickChapter={onClickChapter}
      chapterListClasses={classes}
    />
  );
}

export default ChapterList;
