import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';
import { useMediaQuery } from '@material-ui/core';

import { ReferenceContext, AppContext } from '../../context';
import { ButtonGroupUI } from '../../components';

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
    <ButtonGroupUI
      buttons={[
        { title: showBook && showBook.toUpperCase(), onClick: handleClickBook },
        { title: showChapter, onClick: handleClickChapter },
      ]}
      buttonGroupProps={{
        disableElevation: true,
        variant: 'outlined',
        color: 'inherit',
        className: 'intro-obsSelect',
      }}
    />
  );
}

export default ShowReference;
