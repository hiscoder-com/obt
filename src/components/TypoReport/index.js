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
} from '@material-ui/core';
import useStyles from './style';

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
        <Typography variant="subtitle2">
          If you find an error, then select this piece of text and press &nbsp;
          <Button size="small" variant="contained" onClick={handleClickOpen}>
            Report a bug
          </Button>
          &nbsp; Thank!
          <Dialog open={open} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Report a typo</DialogTitle>
            <DialogContent>
              <DialogContentText>Text to be sent to our editors:</DialogContentText>
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
                Send message
              </Button>
            </DialogActions>
          </Dialog>
        </Typography>
      </Container>
    </AppBar>
  );
}
