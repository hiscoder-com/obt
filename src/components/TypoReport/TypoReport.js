import React, { useContext, useState } from 'react';

import { SendError } from 'tsv-frontend';
import { AppContext } from '../../App.context';

import FinishDialog from './FinishDialog';
import ReportDialog from './ReportDialog';

import { Backdrop, CircularProgress } from '@material-ui/core';

import useStyles from './style';

export default function TypoReport() {
  const { state, actions } = useContext(AppContext);
  const { referenceSelected, type, quote, showErrorReport } = state;
  const { setShowErrorReport } = actions;

  const [answer, setAnswer] = useState(null);
  const [valueComment, setValueComment] = useState('');
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setValueComment(e.target.value);
  };
  const handleClickOpenFinishDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = (openBackdrop) => {
    setOpenBackdrop(!openBackdrop);
    async function sendMyError() {
      return SendError({
        reference: referenceSelected.chapter + ':' + referenceSelected.verse,
        bookId: referenceSelected.bookId,
        resource: type,
        serverLink: 'http://localhost:4000/send',
        fields: {
          Note: valueComment,
          Quote: quote,
        },
      });
    }
    sendMyError()
      .then((result) => {
        setAnswer(JSON.stringify(result));
        console.log(result);
        setValueComment('');
        setShowErrorReport(false);
        setOpenBackdrop(false);
        handleClickOpenFinishDialog();
      })
      .catch((error) => console.log(error));
  };

  function handleCancel() {
    setShowErrorReport(false);
  }
  const classes = useStyles();

  return (
    <>
      <ReportDialog
        open={showErrorReport}
        valueComment={valueComment}
        handleChange={handleChange}
        handleCancel={handleCancel}
        handleSend={handleSend}
      />
      <FinishDialog isOpen={open} onClose={handleClose} />
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
