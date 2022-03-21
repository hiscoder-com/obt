import { Box, Button, Grid, TextField } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogUI } from '..';
import { AppContext } from '../../context';
import { isJson } from '../../helper';
import { useStyles } from './style';

function DownloadLayout() {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    state: { showDownloadLayout },
    actions: { setShowDownloadLayout, setLayoutStorage },
  } = useContext(AppContext);
  const [insertedLayout, setInsertedLayout] = useState('');
  const [newNameLayout, setNewNameLayout] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const importLayout = () => {
    if (insertedLayout !== '' && isJson(insertedLayout)) {
      const addLayout = JSON.parse(insertedLayout);
      setNewNameLayout('');

      if (addLayout.name && addLayout.value && addLayout.language && addLayout.source) {
        setLayoutStorage((prev) => [...prev, addLayout]);
        setShowDownloadLayout(false);
      } else {
        enqueueSnackbar(t('Warning_Not_all_resources'), { variant: 'warning' });
      }
    } else {
      enqueueSnackbar(t('Warning_invalid_format'), { variant: 'warning' });
    }
  };

  return (
    <>
      <Box className={classes.addButton}>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            setShowDownloadLayout(true);
            setNewNameLayout('');
          }}
        >
          {t('Add_layout')}
        </Button>
      </Box>
      <DialogUI
        open={showDownloadLayout}
        onClose={() => {
          setShowDownloadLayout(false);
        }}
        classes={{
          root: { paper: 'intro-settings' },
        }}
        title={t('Add_layout')}
        maxWidth="xs"
      >
        <Grid container justifyContent="center" spacing={1}>
          <Grid item>
            <TextField
              className={classes.layoutName}
              label={t('Layout_Name')}
              variant="outlined"
              size="small"
              value={newNameLayout.slice(0, 100)}
              onChange={(event) => setNewNameLayout(event.target.value)}
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
            <Button variant="contained" onClick={importLayout}>
              {t('SaveLayoutBtn')}
            </Button>
          </Grid>
        </Grid>
      </DialogUI>
    </>
  );
}

export default DownloadLayout;
