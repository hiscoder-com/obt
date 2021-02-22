import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { Button, Container } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
}));

export default function BottomAppBar() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    const url = `https://docs.google.com/forms/u/0/d/e/1FAIpQLSeoo8oL77CpI9Axy2uT6zTCVH9wvZNmvyDaOft6d_-ZOzlIpQ/formResponse?entry.2013941061=${window
      .getSelection()
      .toString()}&entry.1397183109=${window.location}`;

    fetch(url);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const classes = useStyles();

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Container fixed>
        <Typography variant="h6">
          Если вы нашли ошибку, то выделите этот фрагмент текста и нажмите &nbsp;
          <Button color="secondary" variant="contained" onClick={handleClick}>
            Сообщить об ошибке
          </Button>
          &nbsp; Спасибо!
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Ваша заметка отправлена"
            action={
              <React.Fragment>
                <Button color="secondary" size="small" onClick={handleClose} />
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
          />
        </Typography>
      </Container>
    </AppBar>
  );
}
