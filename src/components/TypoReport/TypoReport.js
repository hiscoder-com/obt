import React, { useContext, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { SendError } from 'tsv-frontend';
import { AppContext } from '../../App.context';

import LogoFriends from './LogoFriends';

import ErrorIcon from '@material-ui/icons/Error';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  Backdrop,
  CircularProgress,
  Link,
} from '@material-ui/core';

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

  const handleSend = () => {
    setOpenBackdrop(!openBackdrop);
    async function sendMyError() {
      let response = await SendError({
        reference: referenceSelected.chapter + ':' + referenceSelected.verse,
        bookId: referenceSelected.bookId,
        resource: type,
        serverLink: 'https://tsv-backend.herokuapp.com/send',
        fields: {
          Note: valueComment,
          Quote: quote,
        },
      });
      setAnswer(JSON.stringify(response));
    }
    sendMyError();
    setValueComment('');
    setOpenDialog(false);
    setOpenBackdrop(false);
    handleClickOpenFinishDialog();
    console.log(answer);
  };

  function handleCancel() {
    setOpenDialog(false);
  }
  const wrongQuote = 'Вы не выбрали стих. Кликните по стиху';
  const classes = useStyles();

  return (
    <>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        <ErrorIcon className={classes.icon} /> {t('Report_bug')}
      </Button>

      <Dialog open={openDialog}>
        <DialogTitle className={classes.title}>{t('Report_typo')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('Text_to_editors')}</DialogContentText>
          <DialogContentText className={classes.select}>
            {quote === '' ? wrongQuote : quote}
          </DialogContentText>
          <DialogContentText>{selectionNode}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label={t('Your_comment')}
            type="text"
            value={valueComment}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button
            onClick={handleCancel}
            variant="contained"
            color="primary"
            className={classes.cancel}
          >
            {t('Cancel')}
          </Button>
          <Button
            onClick={handleSend}
            variant="contained"
            color="secondary"
            className={classes.send}
          >
            {t('Send_message')}
          </Button>
          <Backdrop className={classes.backdrop} open={openBackdrop}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </DialogActions>
      </Dialog>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText className={classes.center}>
            <LogoFriends />
            {t('Thanks_report1')} <br />
            {t('Thanks_report2')} <br /> <br />
            {t('See_logs1')} <br />
            <Link href="https://git.door43.org/BSA/errors" target="_blank">
              {t('See_logs2')}
            </Link>
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.secondActions}>
          <Button onClick={handleClose} variant="contained" color="primary">
            {t('Close')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
