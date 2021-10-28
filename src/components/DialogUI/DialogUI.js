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
  styleClose,
  styleApply,
}) {
  //TODO I can't destructed object like this:
  // const { classClose, variantClose, colorClose } =  styleClose;
  // const { classApply, variantApply, colorApply } = styleApply;
  const classes = useStyles();

  return (
    <Dialog
      classes={classes}
      open={open}
      fullWidth={true}
      maxWidth={'sm'}
      onClose={onClose}
    >
      {titleDialog && <DialogTitle>{titleDialog}</DialogTitle>}
      <DialogContent style={{ padding: 0 }}>{children}</DialogContent>
      {(labelClose || labelApply) && (
        <DialogActions>
          {labelClose && (
            <Button
              onClick={onClose}
              class={styleClose.classClose}
              variant={
                styleClose && styleClose?.variantClose && !styleClose?.classClose
                  ? styleClose.variantClose
                  : 'outlined'
              }
              color={
                styleClose && styleClose?.colorClose && !styleClose?.classClose
                  ? styleClose.colorClose
                  : 'secondary'
              }
            >
              {labelClose}
            </Button>
          )}
          {labelApply && (
            <Button
              onClick={onApply}
              class={styleApply.classApply}
              variant={
                styleApply.variantApply && !styleApply.classApply
                  ? styleApply.variantApply
                  : 'outlined'
              }
              color={
                styleApply.colorApply && !styleApply.classApply
                  ? styleApply.colorApply
                  : 'secondary'
              }
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
