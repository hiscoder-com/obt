import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useSnackbar } from 'notistack';
import React, { useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext, ReferenceContext } from '../../context';
import { isJson } from '../../helper';
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
  const listOfSavedLayouts = useMemo(
    () =>
      saveLayout.map((element, index) => {
        return (
          <MenuItem className={classes.Select} value={index} key={index}>
            {element.name}

            <DeleteIcon
              fontSize="small"
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </MenuItem>
        );
      }),
    [classes.Select, saveLayout]
  );
  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="themeId">
          Layouts
        </InputLabel>
        <Select value="" onChange={loadSavedLayout} disableUnderline={true}>
          {listOfSavedLayouts}
        </Select>
      </FormControl>
      <TextField
        className={classes.layoutName}
        onChange={(event) => setNameLayout(event.target.value)}
        id="outlined-basic"
        label="Layout Name"
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
        label="Layout"
        id="outlined-basic"
      />
      <Button onClick={saveNewLayout}> saveLayout</Button>
    </>
  );
}
