import React from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@material-ui/core';

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

  return (
    <Dialog open={open} onClose={onClose}>
      {titleDialog && <DialogTitle>{titleDialog}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
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
