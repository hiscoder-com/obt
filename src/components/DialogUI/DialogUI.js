import React from 'react';
import PropTypes from 'prop-types';
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

DialogUI.propTypes = {
  /** className of Dialog */
  classesMain: PropTypes.string,
  /** className of first Button (Close) in DialogActions */
  classesClose: PropTypes.string,
  /** className of second Button (Apply) in DialogActions*/
  classesApply: PropTypes.string,
  /** className of DialogActions */
  classesActions: PropTypes.string,
  /** className of DialogTitle */
  classesTitle: PropTypes.string,
  /** disabled of first Button (Close) */
  disabledClose: PropTypes.bool,
  /** disabled of second Button (Apply) */
  disabledApply: PropTypes.bool,
  /** opening Dialog */
  open: PropTypes.bool,
  /** children of DialogTitle */
  titleDialog: PropTypes.string,
  /** showing close button in title, working with onClose*/
  titleDialogClose: PropTypes.bool,
  /** label of first Button (Close)*/
  labelClose: PropTypes.string,
  /** label of first Button (Close)*/
  labelApply: PropTypes.string,
  /** children of DialogContent */
  children: PropTypes.string,
  /** func onClose & func onClick of first Button */
  onClose: PropTypes.func,
  /** func onClick of second Button */
  onApply: PropTypes.string,
  /** style of first Button */
  styleClose: PropTypes.object,
  /** style of second Button */
  styleApply: PropTypes.object,
};
