import React, { useContext, useState, useEffect } from 'react';
import { DialogUI } from '..';

import { AppContext } from '../../context';
import { Box, Button, TextField } from '@material-ui/core';
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
      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            setShowDownloadLayout(true);
          }}
        >
          {t('Download_Layout')}
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
        title={t('Download_Layout')}
        maxWidth="sm"
      >
        <TextField
          className={classes.layoutName}
          // onChange={(event) => setNameLayout(event.target.value)}
          id="outlined-basic"
          label={t('Layout_Name')}
          variant="outlined"
          value={newNameLayout}
        />
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
        <Button variant="contained" onClick={importLayout}>
          {t('SaveLayout')}
        </Button>
      </DialogUI>
    </>
  );
}

export default DownloadLayout;
