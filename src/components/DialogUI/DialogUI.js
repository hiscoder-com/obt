import React from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  DialogTitle as MuiDialogTitle,
  IconButton,
  withStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

function DialogUI({
  classesMain,
  classesClose,
  classesApply,
  disabledClose,
  disabledApply,
  open,
  titleDialog,
  titleDialogClose,
  labelClose,
  labelApply,
  children,
  onClose,
  onApply,
  styleClose = { variantClose: 'outlined', colorClose: 'secondary' },
  styleApply = { variantApply: 'outlined', colorApply: 'primary' },
  classesActions,
  classesTitle,
}) {
  const { variantClose = 'outlined', colorClose = 'secondary' } = styleClose;
  const { variantApply = 'outlined', colorApply = 'primary' } = styleApply;

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle className={classes.root} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  return (
    <Dialog
      classes={classesMain}
      open={open}
      fullWidth={true}
      maxWidth={'sm'}
      onClose={onClose}
    >
      {(titleDialog || titleDialogClose) && (
        <DialogTitle className={classesTitle} onClose={titleDialogClose && onClose}>
          {titleDialog}
        </DialogTitle>
      )}
      <DialogContent>{children}</DialogContent>
      {(labelClose || labelApply) && (
        <DialogActions className={classesActions}>
          {labelClose && (
            <Button
              disabled={disabledClose}
              onClick={onClose}
              variant={variantClose}
              color={colorClose}
              className={classesClose}
            >
              {labelClose}
            </Button>
          )}
          {labelApply && (
            <Button
              disabled={disabledApply}
              onClick={onApply}
              variant={variantApply}
              className={classesApply}
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
