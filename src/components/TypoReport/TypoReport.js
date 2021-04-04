import React from 'react';
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
import { useTranslation } from 'react-i18next';
import useStyles from './style';

export default function TypoReport() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [valueComment, setValueComment] = React.useState('');
  const [selectionNode, setSelectionNode] = React.useState('');
  const [selectionTypo, setSelectionTypo] = React.useState('');
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const { t, i18n } = useTranslation();

  const handleChange = (e) => {
    setValueComment(e.target.value);
  };

  function handleClickOpen() {
    if (window.getSelection().toString()) {
      setOpenDialog(true);
      setSelectionNode(
        window.getSelection()?.anchorNode?.parentNode?.textContent?.toString()
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
          {t('Typo.1')} &nbsp;
          <Button size="small" variant="contained" onClick={handleClickOpen}>
            {t('Typo.2')}
          </Button>
          &nbsp; {t('Typo.3')}
          <Dialog open={openDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{t('Typo.4')}</DialogTitle>
            <DialogContent>
              <DialogContentText>{t('Typo.5')}</DialogContentText>
              <DialogContentText className={classes.select}>
                {selectionTypo}
              </DialogContentText>
              <DialogContentText>{selectionNode}</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="comment"
                label={t('Typo.6')}
                type="text"
                value={valueComment}
                onChange={handleChange}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancel} color="primary" className={classes.select}>
                {t('Typo.7')}
              </Button>
              <Button onClick={handleSend} color="primary">
                {t('Typo.8')}
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
