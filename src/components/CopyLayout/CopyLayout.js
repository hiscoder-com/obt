import React, { useCallback, useContext, useMemo, useState } from 'react';

import {
  Button,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

import { AppContext, ReferenceContext } from '../../context';

import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import { useStyles } from './style';
import { SettingsItem } from '../Settings';

export default function CopyLayout() {
  const {
    state: { appConfig, layoutStorage, languageResources },
    actions: { setAppConfig, setLayoutStorage, setLanguageResources },
  } = useContext(AppContext);
  const {
    state: {
      referenceSelected: { bookId },
    },
  } = useContext(ReferenceContext);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const [nameLayout, setNameLayout] = useState('');
  const [currentSelected, setCurrentSelected] = useState(-1);
  const classes = useStyles();
  const isCurrentOBS = bookId === 'obs';

  const saveNewLayout = useCallback(() => {
    const checkingNameLayout = layoutStorage.every((item) => item.name !== nameLayout);
    const checkingLayoutContent = layoutStorage.every((item) => item.value !== appConfig);

    if (!checkingLayoutContent) {
      enqueueSnackbar(t('Error_layout'), { variant: 'warning' });
      return false;
    }
    if (nameLayout.trim() !== '' && checkingNameLayout) {
      setLayoutStorage((prev) => [
        ...prev,
        {
          name: nameLayout,
          value: appConfig,
          language: languageResources,
          isOBS: isCurrentOBS,
        },
      ]);
      enqueueSnackbar(t('New_layout_saved'), { variant: 'success' });
      setNameLayout('');
    } else {
      enqueueSnackbar(
        nameLayout.trim() === '' ? t('Error_missing_name') : t('Error_name'),
        {
          variant: 'warning',
        }
      );
    }
  }, [
    appConfig,
    enqueueSnackbar,
    isCurrentOBS,
    languageResources,
    layoutStorage,
    nameLayout,
    setLayoutStorage,
    t,
  ]);
  const loadSavedLayout = useCallback(
    (event) => {
      const { isOBS, value, language } = layoutStorage[event.target.value];
      setCurrentSelected(event.target.value);

      if (isCurrentOBS === isOBS) {
        setLanguageResources(language);
        setAppConfig(value);
      } else {
        enqueueSnackbar(
          !isCurrentOBS ? t('Warning_go_to_OBS') : t('Warning_go_to_BIBLE'),
          {
            variant: 'warning',
          }
        );
      }
    },
    [enqueueSnackbar, isCurrentOBS, layoutStorage, setAppConfig, setLanguageResources, t]
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
  const copyToClipboard = useCallback(
    (text) => {
      return navigator.clipboard.writeText(text).then(
        () => {
          enqueueSnackbar(t('Copied_success'), { variant: 'success' });
        },
        (err) => {
          enqueueSnackbar(t('Copied_error'), { variant: 'error' });
        }
      );
    },
    [enqueueSnackbar, t]
  );
  const listOfSavedLayouts = useMemo(() => {
    setCurrentSelected(-1);
    return layoutStorage.map((element, index) => {
      if (JSON.stringify(element.value) === JSON.stringify(appConfig)) {
        setCurrentSelected(index);
      }
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
    });
  }, [appConfig, classes, copyToClipboard, deleteLayout, layoutStorage]);

  return (
    <SettingsItem title={t('Layout')}>
      <Grid container direction="column" spacing={2}>
        {layoutStorage.length > 0 && (
          <Grid item>
            <FormControl variant="outlined">
              <Select
                className={classes.select}
                value={currentSelected}
                renderValue={(selected) =>
                  layoutStorage[selected]?.name ?? t('Not_saved')
                }
                onChange={loadSavedLayout}
              >
                {currentSelected === -1 ? (
                  <MenuItem className={classes.menuItemLayoutList} value={-1}>
                    <div className={classes.elementNameLayoutList}>{t('Not_saved')}</div>
                  </MenuItem>
                ) : (
                  ''
                )}
                {listOfSavedLayouts}
              </Select>
            </FormControl>
          </Grid>
        )}
        <Grid item>
          <TextField
            className={classes.textField}
            onChange={(event) => setNameLayout(event.target.value)}
            placeholder={t('Layout_name')}
            variant="outlined"
            value={nameLayout.slice(0, 100)}
          />
        </Grid>
        <Grid item>
          <Button color="primary" variant="contained" onClick={saveNewLayout}>
            {t('Save_layout_button')}
          </Button>
        </Grid>
      </Grid>
    </SettingsItem>
  );
}
