import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';

import { AppContext } from '../../App.context';

import LogoFriends from './LogoFriends';

import ErrorIcon from '@material-ui/icons/Error';
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  Backdrop,
  CircularProgress,
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

    const formData = new FormData();
    formData.append('pass', 'success');
    formData.append('ref', selectionNode);
    formData.append('selected', selectionTypo);
    formData.append('comment', valueComment);

    fetch('https://bsa.foxprogs.com/error.php', {
      method: 'POST',
      body: formData,
    })
      .then(function (response) {
        setValueComment('');
        setOpenDialog(false);
        setOpenBackdrop(false);
        handleClickOpenFinishDialog();
      })
      .catch((error) => console.log(error));
  }

  function handleCancel() {
    setOpenDialog(false);
  }

  const classes = useStyles();

  return (
    <Typography variant="subtitle2" className={classes.root}>
      <Button size="small" variant="outlined" color="inherit" onClick={handleClickOpen}>
        <ErrorIcon /> {t('Report_bug')}
      </Button>

      <Dialog open={openDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{t('Report_typo')}</DialogTitle>
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
        <DialogActions>
          <Button onClick={handleCancel} color="primary" className={classes.select}>
            {t('Cancel')}
          </Button>
          <Button onClick={handleSend} color="primary">
            {t('Send_message')}
          </Button>
          <Backdrop className={classes.backdrop} open={openBackdrop}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </DialogActions>
      </Dialog>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <LogoFriends />
            {t('Thanks_report')}
            {t('See_logs')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Typography>
  );
}
