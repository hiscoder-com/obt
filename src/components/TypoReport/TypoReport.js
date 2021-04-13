import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';

import { AppContext } from '../../App.context';

import {
  AppBar,
  Typography,
  Button,
  Container,
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
  const { t } = useTranslation();

  const handleChange = (e) => {
    setValueComment(e.target.value);
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
      })
      .catch((error) => console.log(error));
  }

  function handleCancel() {
    setOpenDialog(false);
  }

  const classes = useStyles();

  return (
    <AppBar color="primary" className={classes.appBar}>
      <Container fixed>
        <Typography variant="subtitle2">
          {t('find_an_error')} &nbsp;
          <Button size="small" variant="contained" onClick={handleClickOpen}>
            {t('Report_bug')}
          </Button>
          &nbsp; {t('Thanks')}
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
        </Typography>
      </Container>
    </AppBar>
  );
}
