import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
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
  primary = { text: false, onClick: false, disabled: false },
  secondary = { text: false, onClick: false, disabled: false },
  classes = {},
  maxWidth = 'md',
  title = false,
  children,
  open,
  onClose,
  isClosable = true,
}) {
  const classesLocalTitle = useLocalTitleStyles();
  const { t } = useTranslation();

  return (
    <Dialog
      classes={classes.root}
      open={open}
      fullWidth={true}
      maxWidth={maxWidth}
      onClose={onClose}
    >
      {title && (
        <DialogTitle>
          {title}
          {isClosable && (
            <IconButton
              aria-label="close"
              className={classesLocalTitle.closeButton}
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}
      <DialogContent className={classes.content}>{children}</DialogContent>
      {(primary?.onClick || secondary?.onClick) && (
        <DialogActions>
          {secondary?.onClick && (
            <Button
              onClick={secondary.onClick}
              variant={'contained'}
              disabled={secondary.disabled ?? false}
            >
              {secondary?.text ?? t('Cancel')}
            </Button>
          )}
          {primary?.onClick && (
            <Button
              onClick={primary.onClick}
              color={'primary'}
              variant={'contained'}
              disabled={primary.disabled ?? false}
            >
              {primary?.text ?? t('Apply')}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
}

export default DialogUI;

DialogUI.defaultProps = {
  primary: { text: false, onClick: false, disabled: false },
  secondary: { text: false, onClick: false, disabled: false },
  classes: {},
  maxWidth: 'md',
  title: false,
  open: false,
  isClosable: true,
};

DialogUI.propTypes = {
  primary: PropTypes.shape({
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    onClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    disabled: PropTypes.bool,
  }),
  secondary: PropTypes.shape({
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    onClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    disabled: PropTypes.bool,
  }),
  maxWidth: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  isClosable: PropTypes.bool,
  classes: PropTypes.object,
  children: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};
