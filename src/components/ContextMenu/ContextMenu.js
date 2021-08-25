import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

import { AppContext } from '../../context/AppContext';
import { ReferenceContext } from '../../context/ReferenceContext';

import { Menu, MenuItem } from '@material-ui/core';

const initialPositionContextMenu = {
  mouseX: null,
  mouseY: null,
};
function ContextMenu({ introClasses }) {
  const {
    state: { introContextMenuOpen, introContextMenuPosition, positionContextMenu },
    actions: { setShowErrorReport, setPositionContextMenu },
  } = useContext(AppContext);

  const {
    state: { referenceBlock },
  } = useContext(ReferenceContext);

  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const handleContextClose = () => {
    setPositionContextMenu(initialPositionContextMenu);
  };

  const handleOpenError = () => {
    setShowErrorReport(true);
    setPositionContextMenu(initialPositionContextMenu);
  };

  const handleToClipboard = () => {
    navigator.clipboard
      .writeText(
        `${referenceBlock.text} (${t(referenceBlock.bookId)} ${referenceBlock.chapter}:${
          referenceBlock.verse
        })`
      )
      .then(
        () => {
          handleContextClose();
          enqueueSnackbar(t('copied_success'), { variant: 'success' });
        },
        (err) => {
          handleContextClose();
          enqueueSnackbar(t('copied_error'), { variant: 'error' });
        }
      );
  };

  const anchorPosition =
    positionContextMenu.mouseY !== null && positionContextMenu.mouseX !== null
      ? { top: positionContextMenu.mouseY, left: positionContextMenu.mouseX }
      : undefined;

  return (
    <Menu
      keepMounted
      open={positionContextMenu.mouseY !== null || introContextMenuOpen}
      onClose={handleContextClose}
      anchorReference="anchorPosition"
      anchorPosition={
        introContextMenuOpen && introContextMenuPosition
          ? introContextMenuPosition
          : anchorPosition
      }
      PopoverClasses={introClasses}
    >
      <MenuItem onClick={handleOpenError}>{t('Error_report')}</MenuItem>
      <MenuItem onClick={handleToClipboard}>{t('Copy_to_clipboard')}</MenuItem>
    </Menu>
  );
}

export default ContextMenu;
