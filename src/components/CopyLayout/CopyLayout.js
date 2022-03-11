import React, { useContext, useState, useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../context';
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { useStyles } from './style';

export default function CopyLayout() {
  const {
    state: { appConfig, saveLayout, languageResources },
    actions: { setAppConfig, setSaveLayout, setLanguageResources },
  } = useContext(AppContext);
  const classes = useStyles();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const [nameLayout, setNameLayout] = useState('');
  const [value, setValue] = useState(appConfig);

  const saveNewLayout = () => {
    const checkingNameLayout = saveLayout.every((item, i) => {
      if (item.name === nameLayout) {
        return false;
      } else {
        return true;
      }
    });
    if (checkingNameLayout && nameLayout !== '') {
      setSaveLayout((prev) => [
        ...prev,
        { name: nameLayout, value: value, language: languageResources },
      ]);
      setNameLayout('');
    } else if (nameLayout === '') {
      enqueueSnackbar(t('warningNoNameLayout'), { variant: 'warning' });
    } else {
      enqueueSnackbar(t('WarningLayoutNameExists'), { variant: 'warning' });
    }
  };
  const loadSavedLayout = (event) => {
    let val = saveLayout[event.target.value];
    setLanguageResources(val.language);
    setAppConfig(val.value);
  };
  const listOfSavedLayouts = useMemo(
    () =>
      saveLayout.map((element, index) => {
        return (
          <MenuItem value={index} key={index}>
            {element.name}
          </MenuItem>
        );
      }),
    [saveLayout]
  );
  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="themeId">
          Layouts
        </InputLabel>
        <Select onChange={loadSavedLayout} disableUnderline={true}>
          {listOfSavedLayouts}
        </Select>
      </FormControl>
      <TextField
        className={classes.layoutName}
        onChange={(event) => setNameLayout(event.target.value)}
        id="outlined-basic"
        label="Layout Name"
        variant="outlined"
        value={nameLayout}
        // defaultValue={nameLayout}
      />
      <TextField
        multiline={true}
        rows={3}
        name="comment"
        onChange={(event) => setValue(event.target.value)}
        defaultValue={JSON.stringify(value)}
        fullWidth={true}
        size="small"
        variant="outlined"
      />
      <Button onClick={saveNewLayout}> saveLayout</Button>
    </>
  );
}
