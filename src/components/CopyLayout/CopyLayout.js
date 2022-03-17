import React, { useCallback, useContext, useMemo, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
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
    console.log(isCurrentOBS);

    if (isCurrentOBS && source === 'obs') {
      setLanguageResources(language);
      setAppConfig(value);
    } else if (!isCurrentOBS && source !== 'obs') {
      setLanguageResources(language);
      setAppConfig(value);
    } else {
      enqueueSnackbar(bookId !== 'obs' ? t('WarningGoToObs') : t('WarningGoToBible'), {
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
          <MenuItem className={classes.menuItem} value={index} key={index}>
            <div className={classes.elementName}>{element.name}</div>
            <div>
              <IconButton
                className={classes.fileCopyIcon}
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
    <>
      <FormControl variant="outlined" className={classes.formControl}>
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
      <TextField
        className={classes.layoutName}
        onChange={(event) => setNameLayout(event.target.value)}
        label={t('Layout_Name')}
        variant="outlined"
        value={nameLayout.slice(0, 100)}
      />
      <Button
        size="small"
        variant="contained"
        className={classes.button}
        onClick={saveNewLayout}
      >
        {t('SaveLayout')}
      </Button>
    </>
  );
}
