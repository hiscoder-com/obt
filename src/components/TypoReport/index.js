import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import {
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  select: {
    color: 'red',
  },
}));

export default function BottomAppBar() {
  const [open, setOpen] = React.useState(false);

  const selectionNode = window
    .getSelection()
    ?.anchorNode?.parentNode?.textContent?.toString();

  const selection = window.getSelection().toString();

  function handleClickOpen() {
    if (window.getSelection().toString()) {
      return setOpen(true);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Container fixed>
        <Typography variant="subtitle1">
          Если вы нашли ошибку, то выделите этот фрагмент текста и нажмите &nbsp;
          <Button color="inherit" variant="contained" onClick={handleClickOpen}>
            Сообщить об ошибке
          </Button>
          &nbsp; Спасибо!
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Сообщить об опечатке</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Текст, который будет отправлен нашим редакторам:
              </DialogContentText>
              <DialogContentText className={classes.select}>
                {selection}
              </DialogContentText>
              <DialogContentText>{selectionNode}</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="comment"
                label="Ваш комментарий (не обязательно):"
                type="text"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Отправить
              </Button>
            </DialogActions>
          </Dialog>
        </Typography>
      </Container>
    </AppBar>
  );
}

/*
    const url = `https://docs.google.com/forms/u/0/d/e/1FAIpQLSeoo8oL77CpI9Axy2uT6zTCVH9wvZNmvyDaOft6d_-ZOzlIpQ/formResponse?entry.2013941061=${window
      .getSelection()
      .toString()}&entry.1397183109=${window.location}`;

    fetch(url, {
      mode: 'no-cors',
      method: 'GET',
      headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000/' },
      credentials: 'include',
    });
    setOpen(true);
    

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };*/

/*<Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={open}
            autoHideDuration={10000}
            onClose={handleClose}
            message="Ваша заметка отправлена"
            action={
              <React.Fragment>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleClose}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />*/

/*import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';*/
