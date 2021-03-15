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
import useStyles from './style';

export default function TypoReport() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [valueComment, setValueComment] = React.useState('');
  const [selectionNode, setSelectionNode] = React.useState('');
  const [selectionTypo, setSelectionTypo] = React.useState('');
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

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
          If you find an error, then select this piece of text and press &nbsp;
          <Button size="small" variant="contained" onClick={handleClickOpen}>
            Report a bug
          </Button>
          &nbsp; Thank!
          <Dialog open={openDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Report a typo</DialogTitle>
            <DialogContent>
              <DialogContentText>Text to be sent to our editors:</DialogContentText>
              <DialogContentText className={classes.select}>
                {selectionTypo}
              </DialogContentText>
              <DialogContentText>{selectionNode}</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="comment"
                label="Your comment (optional):"
                type="text"
                value={valueComment}
                onChange={handleChange}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancel} color="primary" className={classes.select}>
                Cancel
              </Button>
              <Button onClick={handleSend} color="primary">
                Send message
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
