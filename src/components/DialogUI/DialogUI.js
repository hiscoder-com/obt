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
  styleClose = { classClose: {}, variantClose: 'outlined', colorClose: 'secondary' },
  styleApply = { classApply: {}, variantApply: 'outlined', colorApply: 'secondary' },
}) {
  const classes = useStyles();
  const {
    classClose = {},
    variantClose = 'outlined',
    colorClose = 'secondary',
  } = styleClose;
  const {
    classApply = {},
    variantApply = 'outlined',
    colorApply = 'secondary',
  } = styleApply;
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
            <Button
              onClick={onClose}
              class={classClose}
              variant={variantClose}
              color={colorClose}
            >
              {labelClose}
            </Button>
          )}
          {labelApply && (
            <Button
              onClick={onApply}
              class={classApply}
              variant={variantApply}
              color={colorApply}
            >
              {labelApply}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
}

export default DialogUI;
