import React, { useContext } from 'react';

import { ReferenceContext, AppContext } from '../../context';

import { useTranslation } from 'react-i18next';
import { getAbbr } from '../../config/base';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useStyles } from './style';

function ShowReference() {
  const matches = useMediaQuery('(min-width:400px)');

  const {
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
  const classes = useStyles();

  const abbr = getAbbr(bookId, currentLanguage === 'ru' ? currentLanguage : null);

  const ismobile = matches ? t(bookId) : abbr;
  const showBook = bookId !== 'obs' ? ismobile : t('Story');
  const showChapter = chapter + ':' + verse;

  const handleClickBook = () =>
    bookId !== 'obs' ? setShowBookSelect(true) : setShowChapterSelect(true);
  const handleClickChapter = () => setShowChapterSelect(true);

  return (
    <>
      <div className={classes.root}>
        <div className={classes.showBook} onClick={handleClickBook}>
          {showBook && showBook.toUpperCase()}
        </div>
        <div className={classes.showChapter} onClick={handleClickChapter}>
          {showChapter}
        </div>
      </div>
    </>
  );
}

export default ShowReference;
