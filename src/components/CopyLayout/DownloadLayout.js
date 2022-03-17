import React, { useContext, useState, useEffect } from 'react';
import { DialogUI } from '..';

import { AppContext } from '../../context';
import { Box, Button, Grid, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { useStyles } from './style';
import { isJson } from '../../helper';

function DownloadLayout() {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    state: { showDownloadLayout },
    actions: { setShowDownloadLayout, setSaveLayout },
  } = useContext(AppContext);
  const [value, setValue] = useState();
  const { newNameLayout, setNewNameLayout } = useState('');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (value && isJson(value).name) {
      setNewNameLayout(JSON.parse(value).name);
    }
  }, [value, setNewNameLayout]);

  const importLayout = () => {
    if (value && isJson(value)) {
      const currValue = JSON.parse(value);

      if (currValue.name && currValue.value && currValue.language && currValue.source) {
        setSaveLayout((prev) => [...prev, currValue]);
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
              value={newNameLayout}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.layout}
              multiline={true}
              rows={3}
              name="comment"
              onChange={(event) => setValue(event.target.value)}
              fullWidth={true}
              size="small"
              variant="outlined"
              label={t('Layout')}
              id="outlined-basic"
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={importLayout}>
              {t('SaveLayout')}
            </Button>
          </Grid>
        </Grid>
      </DialogUI>
    </>
  );
}

export default DownloadLayout;
