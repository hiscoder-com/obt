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
import axios from 'axios';

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

  async function handleClose() {
    setOpen(false);

    const formData = new FormData();
    formData.append('pass', 'success');
    formData.append('ref', 'Mat1:1');
    formData.append('selected', 'текст');
    formData.append('comment', 'комментарий');

    /*fetch('https://foxprogs.com/bsa.php', {
      method: 'POST',
      body: formData,
      mode: 'no-cors',
      header: 'access-control-allow-origin',
    })
      .then(function (response) {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }*/
    axios
      .post('https://foxprogs.com/bsa.php', {
        body: formData,
        mode: 'no-cors',
        header: 'Access-Control-Allow-Origin: http://localhost:3000/',
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

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
