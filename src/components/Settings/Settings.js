import React, { useState, useContext } from 'react';
import { DialogUI, SelectTheme } from '..';
import { AppContext } from '../../context';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

function Settings() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const {
    state: { fontSize, showObsImage },
    actions: { setFontSize, setShowObsImage },
  } = useContext(AppContext);

  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
        }}
      >
        Settings
      </div>
      <DialogUI
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        isClosable
        title={' '}
      >
        <SelectTheme label={t('Select_theme')} />

        <FormControlLabel
          control={
            <Checkbox
              checked={showObsImage}
              onChange={(e) => {
                setShowObsImage((prev) => !prev);
              }}
            />
          }
          label="Show images from OBS"
        />
      </DialogUI>
    </>
  );
}

export default Settings;
