import React, { useCallback, useContext, useMemo, useState } from 'react';
import {
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
import { isJson } from '../../helper';
import DeleteIcon from '@material-ui/icons/Delete';
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
          sourse: refSelected,
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

    if (referenceSelected.bookId === 'obs' && currentLayout.sourse === 'obs') {
      setLanguageResources(currentLayout.language);
      setAppConfig(currentLayout.value);
    } else if (referenceSelected.bookId !== 'obs' && currentLayout.sourse !== 'obs') {
      setLanguageResources(currentLayout.language);
      setAppConfig(currentLayout.value);
    } else if (referenceSelected.bookId !== 'obs' && currentLayout.sourse === 'obs') {
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

  const listOfSavedLayouts = useMemo(
    () =>
      saveLayout.map((element, index) => {
        return (
          <MenuItem className={classes.select} value={index} key={index}>
            {element.name}
            <IconButton
              className={classes.deleteIcon}
              onClick={(e) => {
                e.stopPropagation();
                deleteLayout(index);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </MenuItem>
        );
      }),
    [classes.deleteIcon, classes.select, deleteLayout, saveLayout]
  );
  return (
    <>
      <FormControl className={classes.formControl}>
        {listOfSavedLayouts.length > 0 && (
          <>
            <InputLabel shrink id="themeId">
              {t('Layout_List')}
            </InputLabel>
            <Select value="0" onChange={loadSavedLayout} disableUnderline={true}>
              {listOfSavedLayouts}
            </Select>
          </>
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
      <TextField
        multiline={true}
        rows={3}
        name="comment"
        onChange={(event) => setValue(event.target.value)}
        defaultValue={value}
        fullWidth={true}
        size="small"
        variant="outlined"
        label={t('Layout')}
        id="outlined-basic"
      />
      <Button onClick={saveNewLayout}>{t('SaveLayout')}</Button>
    </>
  );
}
