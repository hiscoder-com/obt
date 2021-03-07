import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
} from '@material-ui/core';

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
  const [value, setValue] = React.useState('');
  const [selectionNode, setSelectionNode] = React.useState('');
  const [selection, setSelection] = React.useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  function handleClickOpen() {
    if (window.getSelection().toString()) {
      setOpen(true);
      setSelectionNode(
        window.getSelection()?.anchorNode?.parentNode?.textContent?.toString()
      );
      setSelection(window.getSelection().toString());
    }
  }

  function handleClose() {
    const formData = new FormData();
    formData.append('pass', 'success');
    formData.append('ref', selectionNode);
    formData.append('selected', selection);
    formData.append('comment', value);

    fetch('https://bsa.foxprogs.com/error.php', {
      method: 'POST',
      body: formData,
    })
      .then(function (response) {
        setValue('');
        setOpen(false);
      })
      .catch((error) => console.log(error));
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
          <Dialog open={open} aria-labelledby="form-dialog-title">
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
                value={value}
                onChange={handleChange}
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
