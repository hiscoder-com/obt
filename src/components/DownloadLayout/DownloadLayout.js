import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Box, Button, Grid, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { DialogUI } from '..';
import { AppContext } from '../../context';
import { isJson } from '../../helper';
import { useStyles } from './style';

function DownloadLayout() {
  const classes = useStyles();
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
    <>
      <Box className={classes.addButton}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => setShowDownloadLayout(true)}
        >
          {t('Add_layout')}
        </Button>
      </Box>
      <DialogUI
        primary={{ text: t('Save_layout_button'), onClick: importLayout }}
        open={showDownloadLayout}
        onClose={handleClose}
        title={t('Add_layout')}
        maxWidth="sm"
      >
        <Grid container spacing={1}>
          <Grid item>
            <TextField
              label={t('Layout_name')}
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
              label={t('Layout')}
            />
          </Grid>
        </Grid>
      </DialogUI>
    </>
  );
}

export default DownloadLayout;
