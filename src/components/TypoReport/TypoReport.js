import React, { useContext } from 'react';

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
  const { referenceSelected } = state;

  const [openDialog, setOpenDialog] = React.useState(false);
  const [valueComment, setValueComment] = React.useState('');
  const [selectionNode, setSelectionNode] = React.useState('');
  const [selectionTypo, setSelectionTypo] = React.useState('');
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [open, setOpen] = React.useState(false);
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
    if (window.getSelection().toString()) {
      setOpenDialog(true);
      setSelectionNode(
        referenceSelected.bookId +
          ' ' +
          referenceSelected.chapter +
          ':' +
          referenceSelected.verse
      );
      setSelectionTypo(window.getSelection().toString());
    }
  }

  function handleSend() {
    setOpenBackdrop(!openBackdrop);
    const answer = SendError({
      reference: referenceSelected.chapter + ':' + referenceSelected.verse,
      bookId: referenceSelected.bookId,
      resource: 'resourse',
      serverLink: 'https://tsv-backend.herokuapp.com/send',
      fields: {
        Note: selectionTypo,
        Quote: valueComment,
      },
    });

    // .then(function (response) {
    //   setValueComment('');
    //   setOpenDialog(false);
    //   setOpenBackdrop(false);
    //   handleClickOpenFinishDialog();
    // })
    // .catch((error) => console.log(error));
    console.log(JSON.stringify(answer));
    setValueComment('');
    setOpenDialog(false);
    setOpenBackdrop(false);
    handleClickOpenFinishDialog();
  }

  function handleCancel() {
    setOpenDialog(false);
  }

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
            {selectionTypo}
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
