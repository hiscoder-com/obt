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
import DownloadLayout from './DownloadLayout';
import { isJson } from '../../helper';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { useStyles } from './style';

export default function CopyLayout() {
  const {
    state: { appConfig, saveLayout, languageResources },
    actions: { setAppConfig, setSaveLayout, setLanguageResources },
  } = useContext(AppContext);
  const {
    state: { referenceSelected },
  } = useContext(ReferenceContext);
  const classes = useStyles();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const [nameLayout, setNameLayout] = useState('');
  const [value, setValue] = useState(JSON.stringify(appConfig));

  const saveNewLayout = () => {
    const checkingNameLayout = saveLayout.every((item, i) => {
      if (item.name === nameLayout) {
        return false;
      } else {
        return true;
      }
    });
    const refSelected = referenceSelected.bookId;

    if (checkingNameLayout && nameLayout !== '' && isJson(value)) {
      setSaveLayout((prev) => [
        ...prev,
        {
          name: nameLayout,
          value: JSON.parse(value),
          language: languageResources,
          source: refSelected,
        },
      ]);
      setNameLayout('');
    } else if (nameLayout === '') {
      enqueueSnackbar(t('warningNoNameLayout'), { variant: 'warning' });
    } else if (!isJson(value)) {
      enqueueSnackbar(t('WarningNonCorrectLayout'), { variant: 'warning' });
    } else {
      enqueueSnackbar(t('WarningLayoutNameExists'), { variant: 'warning' });
    }
  };
  const loadSavedLayout = (event) => {
    let currentLayout = saveLayout[event.target.value];

    if (referenceSelected.bookId === 'obs' && currentLayout.source === 'obs') {
      setLanguageResources(currentLayout.language);
      setAppConfig(currentLayout.value);
    } else if (referenceSelected.bookId !== 'obs' && currentLayout.source !== 'obs') {
      setLanguageResources(currentLayout.language);
      setAppConfig(currentLayout.value);
    } else if (referenceSelected.bookId !== 'obs' && currentLayout.source === 'obs') {
      enqueueSnackbar(t('WarningGoToObs'), { variant: 'warning' });
    } else {
      enqueueSnackbar(t('WarningGoToBible'), { variant: 'warning' });
    }
  };

  const deleteLayout = useCallback(
    (index) => {
      console.log(index);
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
      console.log(text);
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
            <>{element.name}</>
            <>
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
            </>
          </MenuItem>
        );
      }),
    [classes, copyToClipboard, deleteLayout, saveLayout]
  );
  const downloadLayout = () => {};
  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        {listOfSavedLayouts.length > 0 && (
          <Box pb={2}>
            <InputLabel shrink id="themeId">
              {t('Layout_List')}
            </InputLabel>
            <Select
              // className={classes.test}
              value={'0'}
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
        id="outlined-basic"
        label={t('Layout_Name')}
        variant="outlined"
        value={nameLayout.slice(0, 100)}
      />
      <Button variant="contained" className={classes.button} onClick={saveNewLayout}>
        {t('SaveLayout')}
      </Button>
      <Button variant="contained" className={classes.button} onClick={downloadLayout}>
        <DownloadLayout />
      </Button>
    </>
  );
}
