import React, { useCallback, useContext, useEffect, useState } from 'react';

import { Box, Button, Grid, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

import { AppContext } from '../../context';
import { DialogUI } from '../../components';

import { isJson } from '../../helper';
import { SettingsItem } from '../Settings';

function DownloadLayout() {
  const { t } = useTranslation();
  const {
    state: { showDownloadLayout, layoutStorage },
    actions: { setShowDownloadLayout, setLayoutStorage },
  } = useContext(AppContext);
  const [insertedLayout, setInsertedLayout] = useState('');
  const [newLayoutName, setNewLayoutName] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isJson(insertedLayout)) {
      setNewLayoutName(JSON.parse(insertedLayout).name);
    }
  }, [insertedLayout]);

  const importLayout = () => {
    if (insertedLayout === '' || !isJson(insertedLayout)) {
      enqueueSnackbar(t('Invalid_format'), { variant: 'warning' });
      return false;
    }
    if (newLayoutName.trim() === '') {
      enqueueSnackbar(t('Error_missing_name'), { variant: 'warning' });
      return false;
    }
    const addLayout = JSON.parse(insertedLayout);
    const layoutCoincidence = layoutStorage.some(
      (element) => JSON.stringify(element.value) === JSON.stringify(addLayout.value)
    );

    if (layoutCoincidence) {
      enqueueSnackbar(t('Error_layout'), { variant: 'warning' });
      return false;
    }
    const nameCoincidence = layoutStorage.some(
      (element) => element.name === newLayoutName
    );

    if (nameCoincidence) {
      enqueueSnackbar(t('Error_name'), { variant: 'warning' });
      return false;
    }

    addLayout.name = newLayoutName;

    if (addLayout.value && addLayout.language) {
      setLayoutStorage((prev) => [...prev, addLayout]);
      setNewLayoutName('');
      setInsertedLayout('');
      setShowDownloadLayout(false);
      enqueueSnackbar(t('New_layout_saved'), { variant: 'success' });
    } else {
      enqueueSnackbar(t('Not_all_resources'), { variant: 'warning' });
    }
  };
  const handleClose = useCallback(() => {
    setShowDownloadLayout(false);
    setNewLayoutName('');
    setInsertedLayout('');
  }, [setShowDownloadLayout]);

  return (
    <SettingsItem title={t('Import_layout')}>
      <Box>
        <Button
          color="primary"
          variant="contained"
          onClick={() => setShowDownloadLayout(true)}
        >
          {t('Import')}
        </Button>
      </Box>
      <DialogUI
        primary={{ text: t('Save_layout_button'), onClick: importLayout }}
        open={showDownloadLayout}
        onClose={handleClose}
        title={t('Import_layout')}
        maxWidth="sm"
      >
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              placeholder={t('Layout_name')}
              variant="outlined"
              size="small"
              value={newLayoutName.slice(0, 100)}
              onChange={(event) => setNewLayoutName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline={true}
              rows={3}
              onChange={(event) => setInsertedLayout(event.target.value)}
              fullWidth={true}
              size="small"
              variant="outlined"
              placeholder={t('Layout')}
            />
          </Grid>
        </Grid>
      </DialogUI>
    </SettingsItem>
  );
}

export default DownloadLayout;
