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
  const [currentSelected, setCurrentSelected] = useState(-1);
  const classes = useStyles();
  const isCurrentOBS = bookId === 'obs';

  const saveNewLayout = useCallback(() => {
    const checkingNameLayout = layoutStorage.every((item) => item.name !== nameLayout);
    const checkingLayoutContent = layoutStorage.every((item) => item.value !== appConfig);

    if (!checkingLayoutContent) {
      enqueueSnackbar(t('такой макет уже существует'), { variant: 'warning' });
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
        enqueueSnackbar(!isCurrentOBS ? t('WARNINGGOTOOBS') : t('WARNINGGOTOBIBLE'), {
          variant: 'warning',
        });
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
          enqueueSnackbar(t('COPIEDSUCCESS'), { variant: 'success' });
        },
        (err) => {
          enqueueSnackbar(t('COPIEDERROR'), { variant: 'error' });
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
                  renderValue={(selected) =>
                    layoutStorage[selected]?.name ?? 'не сохранено'
                  }
                  label={t('LAYOUTLIST')}
                  onChange={loadSavedLayout}
                >
                  {currentSelected === -1 ? (
                    <MenuItem className={classes.menuItemLayoutList} value={-1}>
                      <div className={classes.elementNameLayoutList}>
                        {'не сохранено'}
                      </div>
                    </MenuItem>
                  ) : (
                    ''
                  )}
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
        <Button color="primary" variant="contained" onClick={saveNewLayout}>
          {t('SAVELAYOUTBUTTON')}
        </Button>
      </Grid>
    </Grid>
  );
}
