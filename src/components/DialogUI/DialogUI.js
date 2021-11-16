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
  buttons = [],
  open,
  classes = {},
  style = {},
  title = {},
  children,
  onClose,
}) {
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
      classes={classes.root}
      open={open}
      fullWidth={style.fullWidth}
      maxWidth={style.maxWidth}
      onClose={onClose}
    >
      {title && (
        <DialogTitle
          className={title.classesTitle}
          onClose={title.titleDialogClose && onClose}
        >
          {title.text}
        </DialogTitle>
      )}
      <DialogContent className={classes.content}>{children}</DialogContent>
      {buttons && (
        <DialogActions className={classes.actions}>
          {buttons.map((el, index) => (
            <Button
              key={index}
              disabled={el.disabled}
              variant={el.variant}
              color={el.color}
              className={el.classesButton}
              onClick={el.onClick}
            >
              {el.label}
            </Button>
          ))}
        </DialogActions>
      )}
    </Dialog>
  );
}

export default DialogUI;

DialogUI.propTypes = {
  /** array of buttons in  DialogActions
   props:
    disabled - bool,
    variant - string,
    color - string,
    classeseButton - string
    onClick - func
   */
  buttons: PropTypes.array,
  /** object of classes in  DialogActions,DialogContent,Dialog
   props:
    content - string,
    actions - string,
    root - string,
       */
  classes: PropTypes.object,
  /** children of DialogContent */
  children: PropTypes.string,
  /** func onClose  */
  onClose: PropTypes.func,
  /** open  */
  open: PropTypes.bool,
  /** style of Dialog 
    fullWidth - bool
    maxWidth - string
     */
  style: PropTypes.object,
  /** title
   * classesTitle - string
   * titleDialogClose - bool
   * text = string
   */
  title: PropTypes.object,
};
