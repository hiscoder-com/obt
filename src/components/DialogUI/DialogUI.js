import React from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  DialogTitle as MuiDialogTitle,
  Typography,
  IconButton,
  withStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paperFullWidth: {
    margin: '8px',
    width: 'calc(100% - 8px)',
  },
}));
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
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
function DialogUI({
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
      {(titleDialog || titleDialogClose) && (
        <DialogTitle onClose={titleDialogClose && onClose}>{titleDialog}</DialogTitle>
      )}
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
