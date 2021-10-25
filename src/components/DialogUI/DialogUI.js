import React from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@material-ui/core';

function DialogUI({ open, titleDialog, closeButton, children, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      {titleDialog && <DialogTitle>{titleDialog}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {closeButton && (
          <Button onClick={onClose} variant="outlined" color={'primary'}>
            {closeButton}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default DialogUI;
