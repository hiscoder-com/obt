import React from 'react';

import { ChaptersConfig } from './config';

function ChapterSelection(props) {
  const { setReferenceSelected, referenceSelected, onClose } = props;

  return (
    <>
      {ChaptersConfig
        ? Object.keys(ChaptersConfig[referenceSelected.bookId]).map((key) => (
            <button
              key={key}
              onClick={() => {
                setReferenceSelected({ ...referenceSelected, chapter: key });
                onClose();
              }}
            >
              Глава{key}
            </button>
          ))
        : ''}
    </>
  );
}

export default ChapterSelection;
