import React, { useContext, useState } from 'react';
import { DialogUI } from '..';

import { AppContext } from '../../context';
import { Button, MenuItem, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useStyles } from './style';

function DownloadLayout({ setAnchorMainMenu }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    state: { showDownloadLayout, saveLayout, appConfig },
    actions: { setShowDownloadLayout, setSaveLayout },
  } = useContext(AppContext);
  const [value, setValue] = useState(JSON.stringify(appConfig));

  const importLayout = () => {
    setSaveLayout((prev) => [...prev, value]);
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
          defaultValue={JSON.stringify(saveLayout)}
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
