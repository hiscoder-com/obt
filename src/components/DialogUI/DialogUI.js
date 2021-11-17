import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  DialogTitle,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import useLocalTitleStyles from './style';

function DialogUI({
  buttons = [],
  classes = {},
  style = {},
  title = {},
  children,
  open,
  onClose,
}) {
  const classesLocalTitle = useLocalTitleStyles();

  return (
    <Dialog
      classes={classes.root}
      open={open}
      fullWidth={style.fullWidth}
      maxWidth={style.maxWidth}
      onClose={onClose}
    >
      {Object.keys(title).length > 0 && (
        <DialogTitle className={classes.title}>
          {title.text}
          {title.close ? (
            <IconButton
              aria-label="close"
              className={classesLocalTitle.closeButton}
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
      )}
      <DialogContent className={classes.content}>{children}</DialogContent>
      {buttons?.length > 0 && (
        <DialogActions className={classes.actions}>
          {buttons.map((el, index) => (
            <Button key={index} {...el}>
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
  // children: PropTypes.string,
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
