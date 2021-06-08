import React, { useContext, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { SendError } from 'tsv-frontend';
import { AppContext } from '../../App.context';

import FinishDialog from './FinishDialog';
import ReportDialog from './ReportDialog';

import ErrorIcon from '@material-ui/icons/Error';
import { Button, Backdrop, CircularProgress } from '@material-ui/core';

import useStyles from './style';

export default function TypoReport() {
  const { state } = useContext(AppContext);
  const { referenceSelected, type, quote } = state;

  const [answer, setAnswer] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [valueComment, setValueComment] = useState('');
  const [selectionNode, setSelectionNode] = useState('');
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleChange = (e) => {
    setValueComment(e.target.value);
  };
  const handleClickOpenFinishDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function handleClickOpen() {
    setOpenDialog(true);
    setSelectionNode(
      referenceSelected.bookId +
        ' ' +
        referenceSelected.chapter +
        ':' +
        referenceSelected.verse
    );
  }

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
        setOpenDialog(false);
        setOpenBackdrop(false);
        handleClickOpenFinishDialog();
      })
      .catch((error) => console.log(error));
  };

  function handleCancel() {
    setOpenDialog(false);
  }
  const classes = useStyles();

  return (
    <>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        <ErrorIcon className={classes.icon} /> {t('Report_bug')}
      </Button>
      <ReportDialog
        open={openDialog}
        selectionNode={selectionNode}
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
