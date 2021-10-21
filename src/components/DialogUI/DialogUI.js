import React from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@material-ui/core';

function DialogUI({ openDialog, titleDialog, closeButton, children, closeDialog }) {
  const [open, setOpen] = React.useState(openDialog);
  React.useEffect(() => {
    closeDialog && setOpen(false);
  }, [closeDialog]);
  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <Dialog open={open}>
      {titleDialog && <DialogTitle>{titleDialog}</DialogTitle>}

      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {closeButton && (
          <Button variant="outlined" color={'primary'}>
            {closeButton}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default DialogUI;
