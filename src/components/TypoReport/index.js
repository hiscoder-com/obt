import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { Button, Container } from '@material-ui/core';

function handleClick() {
  const url = `https://docs.google.com/forms/u/0/d/e/1FAIpQLSeoo8oL77CpI9Axy2uT6zTCVH9wvZNmvyDaOft6d_-ZOzlIpQ/formResponse?entry.2013941061=${window
    .getSelection()
    .toString()}&entry.1397183109=${window.location}`;

  fetch(url);
  alert('Ваша заявка принята');
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
}));

export default function BottomAppBar() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Container fixed>
        <Typography variant="h6">
          Если вы нашли ошибку, то выделите этот кусок текста и нажмите &nbsp;
          <Button color="secondary" variant="contained" onClick={handleClick}>
            Сообщить об ошибке
          </Button>
          &nbsp; Спасибо!
        </Typography>
      </Container>
    </AppBar>
  );
}
