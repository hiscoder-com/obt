import React, { useContext } from 'react';

import { ReferenceContext, AppContext } from '../../context';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

import { useTranslation } from 'react-i18next';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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

  const { t } = useTranslation();

  const ismobile = matches ? t(bookId) : t(bookId + '_abbr');
  const showBook = bookId !== 'obs' ? ismobile : t('Story');
  const showChapter = chapter + ':' + verse;

  const handleClickBook = () =>
    bookId !== 'obs' ? setShowBookSelect(true) : setShowChapterSelect(true);
  const handleClickChapter = () => setShowChapterSelect(true);

  return (
    <ButtonGroup disableElevation variant="contained" color="primary">
      <Button onClick={handleClickBook}> {showBook && showBook.toUpperCase()} </Button>
      <Button onClick={handleClickChapter}>{showChapter}</Button>
    </ButtonGroup>
  );
}

export default ShowReference;
