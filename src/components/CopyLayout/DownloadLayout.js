import React, { useContext, useState } from 'react';
import { DialogUI } from '..';

import { AppContext } from '../../context';
import { Button, MenuItem, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { useStyles } from './style';
import { isJson } from '../../helper';

function DownloadLayout({ setAnchorMainMenu }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    state: { showDownloadLayout },
    actions: { setShowDownloadLayout, setSaveLayout },
  } = useContext(AppContext);
  const [value, setValue] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const importLayout = () => {
    if (value.length > 0 && isJson(value)) {
      const currValue = JSON.parse(value);
      if (currValue.name && currValue.value && currValue.language && currValue.source) {
        setSaveLayout((prev) => [...prev, currValue]);
        enqueueSnackbar(t('copied_success'), { variant: 'success' });
        setShowDownloadLayout(false);
      } else {
        alert('no resourses!');
      }
    } else {
      alert('uncorrect format');
    }
  };

  return (
    <>
      <MenuItem
        onClick={() => {
          setShowDownloadLayout(true);
        }}
      >
        {t('Download_Layout')}
      </MenuItem>
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
        <Button variant="contained" className={classes.button} onClick={importLayout}>
          {t('SaveLayout')}
        </Button>
      </DialogUI>
    </>
  );
}

export default DownloadLayout;
