import React, { useContext } from 'react';

import { ReferenceContext, AppContext } from '../../context';

import { useTranslation } from 'react-i18next';
import { getAbbr } from '../../config/base';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function ShowReference() {
  const matches = useMediaQuery('(min-width:400px)');

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

  const ismobile = matches ? t(bookId) : abbr;
  const showBook = bookId !== 'obs' ? ismobile : t('Story');
  const showChapter = chapter + ':' + verse;

  const handleClickBook = () => setShowBookSelect(!showBookSelect);
  const handleClickChapter = () => setShowChapterSelect(!showChapterSelect);

  return (
    <>
      <div style={{ display: 'flex' }}>
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
