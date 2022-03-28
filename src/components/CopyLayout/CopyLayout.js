import React, { useCallback, useContext, useMemo, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { AppContext, ReferenceContext } from '../../context';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import { useStyles } from './style';

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
  const [currentSelected, setCurrentSelected] = useState(0);
  const classes = useStyles();
  const isOBS = bookId === 'obs';

  const saveNewLayout = useCallback(() => {
    const checkingNameLayout = layoutStorage.every((item) => item.name !== nameLayout);

    if (nameLayout.trim() !== '' && checkingNameLayout) {
      setLayoutStorage((prev) => [
        ...prev,
        {
          name: nameLayout,
          value: appConfig,
          language: languageResources,
          isOBS: isOBS,
        },
      ]);
      enqueueSnackbar(t('NEWLAYOUTSAVED'), { variant: 'success' });
      setNameLayout('');
    } else {
      enqueueSnackbar(nameLayout.trim() === '' ? t('NONAMEERROR') : t('NAMEERROR'), {
        variant: 'warning',
      });
    }
  }, [
    appConfig,
    enqueueSnackbar,
    isOBS,
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
      const isCurrentOBS = bookId === 'obs';

      if (isCurrentOBS && isOBS) {
        setLanguageResources(language);
        setAppConfig(value);
      } else if (!isCurrentOBS && !isOBS) {
        setLanguageResources(language);
        setAppConfig(value);
      } else {
        enqueueSnackbar(!isCurrentOBS ? t('WARNINGGOTOOBS') : t('WARNINGGOTOBIBLE'), {
          variant: 'warning',
        });
      }
    },
    [bookId, enqueueSnackbar, layoutStorage, setAppConfig, setLanguageResources, t]
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
          enqueueSnackbar(t('COPIEDSUCCESS'), { variant: 'success' });
        },
        (err) => {
          enqueueSnackbar(t('COPIEDERROR'), { variant: 'error' });
        }
      );
    },
    [enqueueSnackbar, t]
  );
  const listOfSavedLayouts = useMemo(
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

  return (
    <Grid container alignItems="flex-end" spacing={2} item xs={12}>
      <Grid container direction="column" alignItems="center" item xs={12} sm={5}>
        <Grid item>
          <FormControl variant="outlined">
            {layoutStorage.length > 0 && (
              <Box pb={2}>
                <InputLabel shrink>{t('LAYOUTLIST')}</InputLabel>
                <Select
                  className={classes.select}
                  value={currentSelected}
                  renderValue={(selected) => layoutStorage[selected].name}
                  label={t('LAYOUTLIST')}
                  onChange={loadSavedLayout}
                >
                  {listOfSavedLayouts}
                </Select>
              </Box>
            )}
          </FormControl>
        </Grid>
        <Grid item>
          <TextField
            onChange={(event) => setNameLayout(event.target.value)}
            label={t('LAYOUTNAME')}
            variant="outlined"
            value={nameLayout.slice(0, 100)}
          />
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={7}>
        <Button
          color="secondary"
          size="small"
          variant="contained"
          onClick={saveNewLayout}
        >
          {t('SAVELAYOUTBUTTON')}
        </Button>
      </Grid>
    </Grid>
  );
}
