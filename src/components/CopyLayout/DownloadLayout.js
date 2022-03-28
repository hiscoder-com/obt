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
      enqueueSnackbar(t('INVALIDFORMAT'), { variant: 'warning' });
      return false;
    }
    if (newLayoutName.trim() === '') {
      enqueueSnackbar(t('NONAMEERROR'), { variant: 'warning' });
      return false;
    }
    const addLayout = JSON.parse(insertedLayout);
    const layoutCoincidence = layoutStorage.some(
      (element) => JSON.stringify(element.value) === JSON.stringify(addLayout.value)
    );

    if (layoutCoincidence) {
      enqueueSnackbar(t('такой макет уже существует'), { variant: 'warning' });
      return false;
    }
    const nameCoincidence = layoutStorage.some(
      (element) => element.name === newLayoutName
    );

    if (nameCoincidence) {
      enqueueSnackbar(t('NAMEERROR'), { variant: 'warning' });
      return false;
    }

    addLayout.name = newLayoutName;

    if (addLayout.value && addLayout.language) {
      setLayoutStorage((prev) => [...prev, addLayout]);
      setNewLayoutName('');
      setInsertedLayout('');
      setShowDownloadLayout(false);
      enqueueSnackbar(t('NEWLAYOUTSAVED'), { variant: 'success' });
    } else {
      enqueueSnackbar(t('NOTALLRESOURCES'), { variant: 'warning' });
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
          {t('ADDLAYOUT')}
        </Button>
      </Box>
      <DialogUI
        primary={{ text: t('SAVELAYOUTBUTTON'), onClick: importLayout }}
        open={showDownloadLayout}
        onClose={handleClose}
        title={t('ADDLAYOUT')}
        maxWidth="sm"
      >
        <Grid container spacing={1}>
          <Grid item>
            <TextField
              label={t('LAYOUTNAME')}
              variant="outlined"
              size="small"
              value={newLayoutName.slice(0, 100)}
              onChange={(event) => setNewLayoutName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.layout}
              multiline={true}
              rows={3}
              onChange={(event) => setInsertedLayout(event.target.value)}
              fullWidth={true}
              size="small"
              variant="outlined"
              label={t('LAYOUT')}
            />
          </Grid>
        </Grid>
      </DialogUI>
    </>
  );
}

export default DownloadLayout;
