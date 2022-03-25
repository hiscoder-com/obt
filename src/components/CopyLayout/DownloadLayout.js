import React, { useContext, useEffect, useState } from 'react';
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
      setNewLayoutName(insertedLayout ? JSON.parse(insertedLayout).name : '');
    }
  }, [insertedLayout]);

  const importLayout = () => {
    if (insertedLayout === '' || !isJson(insertedLayout)) {
      enqueueSnackbar(t('INVALIDFORMAT'), { variant: 'warning' });
      return false;
    }
    if (newLayoutName === '') {
      enqueueSnackbar(t('NONAMEERROR'), { variant: 'warning' });
      return false;
    }
    const coincidence = layoutStorage.some((element) => element.name === newLayoutName);

    if (coincidence) {
      enqueueSnackbar(t('NAMEERROR'), { variant: 'warning' });
      return false;
    }

    const addLayout = JSON.parse(insertedLayout);
    addLayout.name = newLayoutName;

    if (addLayout.value && addLayout.language && addLayout.source) {
      setLayoutStorage((prev) => [...prev, addLayout]);
      setNewLayoutName('');
      setInsertedLayout('');
      setShowDownloadLayout(false);
      enqueueSnackbar(t('NEWLAYOUTSAVED'), { variant: 'success' });
    } else {
      enqueueSnackbar(t('NOTALLRESOURCES'), { variant: 'warning' });
    }
  };

  return (
    <>
      <Box className={classes.addButton}>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => {
            setShowDownloadLayout(true);
          }}
        >
          {t('ADDLAYOUT')}
        </Button>
      </Box>
      <DialogUI
        open={showDownloadLayout}
        onClose={() => {
          setShowDownloadLayout(false);
          setNewLayoutName('');
          setInsertedLayout('');
        }}
        classes={{
          root: { paper: 'intro-settings' },
        }}
        title={t('ADDLAYOUT')}
        maxWidth="sm"
      >
        <Grid container justifyContent="center" spacing={1}>
          <Grid item>
            <TextField
              className={classes.layoutName}
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
              name="comment"
              onChange={(event) => setInsertedLayout(event.target.value)}
              fullWidth={true}
              size="small"
              variant="outlined"
              label={t('LAYOUT')}
              id="outlined-basic"
            />
          </Grid>
          <Grid item>
            <Button
              color="secondary"
              size="small"
              variant="contained"
              onClick={importLayout}
            >
              {t('SAVELAYOUTBUTTON')}
            </Button>
          </Grid>
        </Grid>
      </DialogUI>
    </>
  );
}

export default DownloadLayout;
