import React, { useContext } from 'react';

import { ReferenceContext, AppContext } from '../../context';
import { saveToClipboard } from '../../helper';

import { getAbbr } from '../../config/base';

function ShowReference() {
  const {
    state: {
      referenceSelected: { bookId, chapter, verse },
    },
  } = useContext(ReferenceContext);
  const {
    state: { currentLanguage },
  } = useContext(AppContext);
  console.log(currentLanguage);

  const abbr = getAbbr(bookId, currentLanguage === 'ru' ? currentLanguage : null);

  const showReference = `  ${
    bookId !== 'obs' ? abbr + ' ' + chapter + ':' + verse : chapter + ':' + verse
  }`;
  const handleToClipboard = () => saveToClipboard(showReference);

  return (
    <>
      <div onClick={handleToClipboard} style={{ display: 'flex' }}>
        <div>{showReference}</div>
      </div>
    </>
  );
}

export default ShowReference;
