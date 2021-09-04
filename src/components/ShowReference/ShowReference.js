import React, { useContext } from 'react';

import { ReferenceContext } from '../../context/ReferenceContext';
import { saveToClipboard } from '../../helper';

import { getAbbr } from '../../config/base';

function ShowReference() {
  const {
    state: {
      referenceSelected: { bookId, chapter, verse },
    },
  } = useContext(ReferenceContext);
  const abbr = getAbbr(bookId, 'ru');
  const showReference2 = `  ${
    bookId !== 'obs' ? abbr + ' ' + chapter + ':' + verse : chapter + ':' + verse
  }`;
  const handleToClipboard = () => saveToClipboard(showReference2);

  return (
    <>
      <div onClick={handleToClipboard} style={{ display: 'flex' }}>
        <div>{showReference2}</div>
      </div>
    </>
  );
}

export default ShowReference;
