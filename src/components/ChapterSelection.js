import React from 'react';

import { ChaptersConfig } from './ChaptersConfig';

function ChapterSelection(props) {
  const { setReferenceSelected, referenceSelected } = props;

  return (
    <>
      {ChaptersConfig
        ? Object.keys(ChaptersConfig[referenceSelected.bookId]).map((key) => (
            <button
              key={key}
              onClick={() => setReferenceSelected({ ...referenceSelected, chapter: key })}
            >
              Глава{key}
            </button>
          ))
        : ''}
    </>
  );
}

export default ChapterSelection;
