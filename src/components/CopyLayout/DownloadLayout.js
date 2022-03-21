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
    isJson(insertedLayout)
      ? setNewLayoutName(insertedLayout ? JSON.parse(insertedLayout).name : '')
      : console.log('newLayoutName');
  }, [insertedLayout]);
  console.log(newLayoutName);

  const importLayout = () => {
    if (insertedLayout !== '' && isJson(insertedLayout)) {
      const addLayout = JSON.parse(insertedLayout);
      if (newLayoutName) {
        addLayout.name = newLayoutName;
      }
      const coincidence = layoutStorage.some(
        (element) => element.name === addLayout.name
      );

      if (coincidence) {
        addLayout.name = addLayout.name + '_copy';
        enqueueSnackbar(t('New_layout_saved'), { variant: 'success' });
      }

      if (addLayout.name && addLayout.value && addLayout.language && addLayout.source) {
        setLayoutStorage((prev) => [...prev, addLayout]);
        setNewLayoutName('');
        setInsertedLayout('');

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
            // setNewLayoutName('');
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
        maxWidth="xs"
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
