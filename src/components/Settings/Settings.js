import React, { useState, useContext } from 'react';
import { DialogUI, SelectTheme } from '..';
import { AppContext } from '../../context';
import { Checkbox, Divider, FormControlLabel, MenuItem } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { FontSizeSlider } from 'translation-helps-rcl';
import { useStyles } from './style';

function Settings() {
  const classes = useStyles();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const {
    state: { fontSize, showObsImage },
    actions: { setFontSize, setShowObsImage },
  } = useContext(AppContext);

  return (
    <>
      <MenuItem
        onClick={() => {
          setOpen(true);
        }}
      >
        Settings
      </MenuItem>
      <DialogUI
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        isClosable
        title={' '}
        maxWidth="sm"
      >
        <SelectTheme label={t('Select_theme')} />
        <Divider className={classes.divider} light />
        <FontSizeSlider
          onChange={setFontSize}
          marks={false}
          max={150}
          min={50}
          step={10}
          value={fontSize}
        />
        <Divider className={classes.divider} light />
        <FormControlLabel
          control={
            <Checkbox
              checked={showObsImage}
              onChange={(e) => {
                setShowObsImage((prev) => !prev);
              }}
            />
          }
          label={t('showObsLabel')}
        />
      </DialogUI>
    </>
  );
}

export default Settings;
