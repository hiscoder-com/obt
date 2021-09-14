import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';
import { Book as BookRCL } from '@texttree/tt-reference-rcl';

import { AppContext, ReferenceContext } from '../../context';
import { BookList } from '../../components';

import { Dialog, DialogContent } from '@material-ui/core';

function BookSelect() {
  const {
    state: { showBookSelect },
    actions: { setShowBookSelect },
  } = useContext(AppContext);

  return (
    <>
      <BookRCL
        classes={bookClasses}
        onClick={() => setShowBookSelect(!showBookSelect)}
        text={t(referenceSelected.bookId ?? 'not_set')}
      />

      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={showBookSelect}
        onClose={() => setShowBookSelect(false)}
      >
        <DialogContent className={'intro-bookList'}>
          <BookList />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default BookSelect;
