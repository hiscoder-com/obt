import { Box, Button, Grid, TextField } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
      enqueueSnackbar(t('Warning_invalid_format'), { variant: 'warning' });
      return false;
    }
    if (newLayoutName === '') {
      enqueueSnackbar(t('имя не может быть пустым полем'), { variant: 'warning' });
      return false;
    }
    const coincidence = layoutStorage.some((element) => element.name === newLayoutName);

    if (coincidence) {
      enqueueSnackbar(t('такое имя уже существует'), { variant: 'error' });
      return false;
    }

    const addLayout = JSON.parse(insertedLayout);
    addLayout.name = newLayoutName;

    if (addLayout.value && addLayout.language && addLayout.source) {
      setLayoutStorage((prev) => [...prev, addLayout]);
      setNewLayoutName('');
      setInsertedLayout('');
      setShowDownloadLayout(false);
      enqueueSnackbar(t('New_layout_saved'), { variant: 'success' });
    } else {
      enqueueSnackbar(t('Warning_Not_all_resources'), { variant: 'warning' });
    }
  };

  return (
    <>
      <Box className={classes.addButton}>
        <Button
          variant="contained"
          onClick={() => {
            setShowDownloadLayout(true);
          }}
        >
          {t('Add_layout')}
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
        title={t('Add_layout')}
        maxWidth="sm"
      >
        <Grid container justifyContent="center" spacing={1}>
          <Grid item>
            <TextField
              className={classes.layoutName}
              label={t('Layout_Name')}
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
              label={t('Layout')}
              id="outlined-basic"
            />
          </Grid>
          <Grid item>
            <Button size="small" variant="contained" onClick={importLayout}>
              {t('SaveLayoutBtn')}
            </Button>
          </Grid>
        </Grid>
      </DialogUI>
    </>
  );
}

export default DownloadLayout;
