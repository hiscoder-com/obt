import React from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paperFullWidth: {
    margin: '8px',
    width: 'calc(100% - 8px)',
  },
}));

function DialogUI({
  open,
  titleDialog,
  labelClose,
  labelApply,
  children,
  onClose,
  onApply,
  styleClose = { variantClose: 'outlined', colorClose: 'secondary' },
  styleApply = { variantApply: 'outlined', colorApply: 'primary' },
}) {
  const classes = useStyles();
  const { variantClose = 'outlined', colorClose = 'secondary' } = styleClose;
  const { variantApply = 'outlined', colorApply = 'primary' } = styleApply;
  return (
    <Dialog
      classes={classes}
      open={open}
      fullWidth={true}
      maxWidth={'sm'}
      onClose={onClose}
    >
      {titleDialog && <DialogTitle>{titleDialog}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      {(labelClose || labelApply) && (
        <DialogActions>
          {labelClose && (
            <Button onClick={onClose} variant={variantClose} color={colorClose}>
              {labelClose}
            </Button>
          )}
          {labelApply && (
            <Button onClick={onApply} variant={variantApply} color={colorApply}>
              {labelApply}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
}

export default DialogUI;
