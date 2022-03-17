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
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { useStyles } from './style';

export default function CopyLayout() {
  const {
    state: { appConfig, saveLayout, languageResources },
    actions: { setAppConfig, setSaveLayout, setLanguageResources },
  } = useContext(AppContext);
  const {
    state: {
      referenceSelected: { bookId },
    },
  } = useContext(ReferenceContext);
  const classes = useStyles();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const [nameLayout, setNameLayout] = useState('');
  const [currentSelected, setCurrentSelected] = useState(0);

  const saveNewLayout = () => {
    const checkingNameLayout = saveLayout.every((item) => item.name !== nameLayout);

    if (checkingNameLayout && nameLayout !== '') {
      setSaveLayout((prev) => [
        ...prev,
        {
          name: nameLayout,
          value: appConfig,
          language: languageResources,
          source: bookId,
        },
      ]);
      setNameLayout('');
    } else {
      enqueueSnackbar(
        nameLayout === '' ? t('warningNoNameLayout') : t('WarningLayoutNameExists'),
        { variant: 'warning' }
      );
    }
  };
  const loadSavedLayout = (event) => {
    const { source, value, language } = saveLayout[event.target.value];
    setCurrentSelected(event.target.value);

    const isCurrentOBS = bookId === 'obs';

    if (isCurrentOBS && source === 'obs') {
      setLanguageResources(language);
      setAppConfig(value);
    } else if (!isCurrentOBS && source !== 'obs') {
      setLanguageResources(language);
      setAppConfig(value);
    } else {
      enqueueSnackbar(!isCurrentOBS ? t('WarningGoToObs') : t('WarningGoToBible'), {
        variant: 'warning',
      });
    }
  };

  const deleteLayout = useCallback(
    (index) => {
      setSaveLayout((prev) => {
        let currentLayout = [...prev];
        currentLayout.splice(index, 1);
        return currentLayout;
      });
    },
    [setSaveLayout]
  );
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
  const listOfSavedLayouts = useMemo(
    () =>
      saveLayout.map((element, index) => {
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
    [classes, copyToClipboard, deleteLayout, saveLayout]
  );

  return (
    <Grid container alignItems="flex-end" spacing={2}>
      <Grid container justifyContent="flex-end" xs={5}>
        <Grid item>
          <FormControl variant="outlined">
            {listOfSavedLayouts.length > 0 && (
              <Box pb={2}>
                <InputLabel shrink id="themeId">
                  {t('Layout_List')}
                </InputLabel>
                <Select
                  style={{ width: '210px' }}
                  value={currentSelected}
                  renderValue={(selected) => saveLayout[selected].name}
                  label={t('Layout_List')}
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
            label={t('Layout_Name')}
            variant="outlined"
            value={nameLayout.slice(0, 100)}
          />
        </Grid>
      </Grid>
      <Grid item xs={7}>
        <Button size="small" variant="contained" onClick={saveNewLayout}>
          {t('SaveLayout')}
        </Button>
      </Grid>
    </Grid>
  );
}
