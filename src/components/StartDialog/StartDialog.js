import React from 'react';
import { AppContext } from '../../context';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

function StartDialog() {
  const {
    actions: { setOpenStartDialog, setLoadIntro },
    state: { openStartDialog },
  } = React.useContext(AppContext);

  const handleClose = () => {
    setOpenStartDialog(false);
    setLoadIntro(true);
  };
  return (
    <Dialog open={openStartDialog} onClose={handleClose}>
      <DialogTitle id="about-title"></DialogTitle>
      <DialogContent>
        <DialogContentText id="about-text">{'Choose your language'}</DialogContentText>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}

export default StartDialog;
