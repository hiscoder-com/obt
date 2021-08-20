import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';
import { Book as BookRCL } from '@texttree/tt-reference-rcl';

import { AppContext } from '../../context/AppContext';
import { ReferenceContext } from '../../context/ReferenceContext';
import BookList from '../BookList/BookList';

import { Dialog, DialogContent } from '@material-ui/core';
import useBookStyles from './style';

function BookSelect() {
  const { t } = useTranslation();

  const {
    state: { showBookSelect },
    actions: { setShowBookSelect },
  } = useContext(AppContext);

  const {
    state: { referenceSelected },
  } = useContext(ReferenceContext);

  const bookClasses = useBookStyles();

  return (
    <>
      <div className={'intro-bookSelect'}>
        <BookRCL
          classes={bookClasses}
          onClick={() => setShowBookSelect(!showBookSelect)}
          text={t(referenceSelected.bookId ?? 'not_set')}
        />
      </div>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={showBookSelect}
        onClose={() => setShowBookSelect(false)}
      >
        <DialogContent>
          <BookList />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default BookSelect;
