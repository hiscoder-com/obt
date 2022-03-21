import React, { useCallback, useContext, useMemo } from 'react';
import { IconButton, MenuItem } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { AppContext } from '../../context';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import { useStyles } from './style';

export default function ListOfSavedLayouts() {
  const {
    state: { layoutStorage },
    actions: { setLayoutStorage },
  } = useContext(AppContext);
  const classes = useStyles();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const copyToClipboard = useCallback(
    (text) => {
      return navigator.clipboard.writeText(text).then(
        () => {
          enqueueSnackbar(t('copied_success'), { variant: 'success' });
        },
        (err) => {
          enqueueSnackbar(t('copied_error'), { variant: 'error' });
        }
      );
    },
    [enqueueSnackbar, t]
  );

  const deleteLayout = useCallback(
    (index) => {
      setLayoutStorage((prev) => {
        let currentLayout = [...prev];
        currentLayout.splice(index, 1);
        return currentLayout;
      });
    },
    [setLayoutStorage]
  );

  return useMemo(
    () =>
      layoutStorage.map((element, index) => {
        return (
          <MenuItem className={classes.menuItemLayoutList} value={index} key={index}>
            <div className={classes.elementNameLayoutList}>{element.name}</div>
            <div>
              <IconButton
                className={classes.copyIcon}
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(JSON.stringify(element));
                }}
              >
                <FileCopyIcon />
              </IconButton>
              <IconButton
                className={classes.deleteIcon}
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteLayout(index);
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
          </MenuItem>
        );
      }),
    [classes, copyToClipboard, deleteLayout, layoutStorage]
  );
}
