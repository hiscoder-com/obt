import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext, ReferenceContext } from '../../context';
import ListOfSavedLayouts from './ListOfSavedLayouts';

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

  const saveNewLayout = () => {
    const checkingNameLayout = layoutStorage.every((item) => item.name !== nameLayout);

    if (checkingNameLayout && nameLayout !== '') {
      setLayoutStorage((prev) => [
        ...prev,
        {
          name: nameLayout,
          value: appConfig,
          language: languageResources,
          source: bookId,
        },
      ]);
      enqueueSnackbar(t('New_layout_saved'), { variant: 'success' });
      setNameLayout('');
    } else {
      enqueueSnackbar(
        nameLayout === '' ? t('warningNoNameLayout') : t('WarningLayoutNameExists'),
        { variant: 'warning' }
      );
    }
  };
  const loadSavedLayout = (event) => {
    const { source, value, language } = layoutStorage[event.target.value];
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
  return (
    <Grid container alignItems="flex-end" spacing={2}>
      <Grid container justifyContent="flex-end" xs={5}>
        <Grid item>
          <FormControl variant="outlined">
            {layoutStorage.length > 0 && (
              <Box pb={2}>
                <InputLabel shrink id="themeId">
                  {t('Layout_List')}
                </InputLabel>
                <Select
                  style={{ width: '210px' }}
                  value={currentSelected}
                  renderValue={(selected) => layoutStorage[selected].name}
                  label={t('Layout_List')}
                  onChange={loadSavedLayout}
                >
                  <ListOfSavedLayouts />
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
          {t('SaveLayoutBtn')}
        </Button>
      </Grid>
    </Grid>
  );
}
