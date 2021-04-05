import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChaptersConfig } from './config';

function ChapterSelection(props) {
  const { setReferenceSelected, referenceSelected, onClose } = props;
  const { t } = useTranslation();
  return (
    <>
      {ChaptersConfig
        ? Object.keys(ChaptersConfig[referenceSelected.bookId]).map((key) => (
            <button
              key={key}
              onClick={() => {
                setReferenceSelected({ ...referenceSelected, chapter: key, verse: 1 });
                onClose();
              }}
            >
              {t('Chapter')}
              {key}
            </button>
          ))
        : ''}
    </>
  );
}

export default ChapterSelection;
