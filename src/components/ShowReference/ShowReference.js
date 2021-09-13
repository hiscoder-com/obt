import React, { useContext } from 'react';

import { ReferenceContext, AppContext } from '../../context';
import { saveToClipboard } from '../../helper';
import { useTranslation } from 'react-i18next';
import { getAbbr } from '../../config/base';

function ShowReference() {
  const {
    state: { showChapterSelect, showBookSelect },
    actions: { setShowChapterSelect, setShowBookSelect },
  } = useContext(AppContext);

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
  const fullName = t(bookId);
  const showReference = `  ${
    bookId !== 'obs'
      ? abbr + ' ' + chapter + ':' + verse
      : t('Story').substring(0, 3) + ' ' + chapter + ':' + verse
  }`;
  const showBook = bookId !== 'obs' ? fullName : t('Story').substring(0, 3);
  const showChapter = chapter + ':' + verse;
  const handleToClipboard = () => saveToClipboard(showReference);
  const handleClickBook = () => setShowBookSelect(!showBookSelect);
  const handleClickChapter = () => setShowChapterSelect(!showChapterSelect);

  return (
    <>
      <div onClick={handleToClipboard} style={{ display: 'flex' }}>
        <div style={{ paddingLeft: '3px', display: 'flex' }}>
          <div onClick={handleClickBook} style={{ margin: '5px' }}>
            {showBook ? showBook.toUpperCase() : null}
          </div>
          <div onClick={handleClickChapter} style={{ margin: '5px' }}>
            {showChapter}
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowReference;
