import React, { useContext } from 'react';

import { ReferenceContext, AppContext } from '../../context';
import { saveToClipboard } from '../../helper';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  const abbr = getAbbr(bookId, currentLanguage === 'ru' ? currentLanguage : null);

  const showReference = `  ${
    bookId !== 'obs'
      ? abbr + ' ' + chapter + ':' + verse
      : t('Story').substring(0, 3) + ' ' + chapter + ':' + verse
  }`;
  const handleToClipboard = () => saveToClipboard(showReference);

  return (
    <>
      <div onClick={handleToClipboard} style={{ display: 'flex' }}>
        <div style={{ paddingTop: '3px', paddingLeft: '3px' }}>{showReference}</div>
      </div>
    </>
  );
}

export default ShowReference;
