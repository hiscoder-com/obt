import React, { useContext } from 'react';

import { InputLabel, MenuItem } from '@material-ui/core';
import { FontSizeSlider } from 'translation-helps-rcl';
import { useTranslation } from 'react-i18next';

import { AppContext } from '../../context';
import {
  DialogUI,
  SelectTheme,
  CopyLayout,
  DownloadLayout,
  SwitchChunks,
  SwitchWordPopover,
  SwitchExtraTitleCard,
  SwitchObsImage,
  SettingsItem,
} from '../../components';

import { useStyles } from './style';

function Settings({ setAnchorMainMenu }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    state: { fontSize, showSettingsMenu },
    actions: { setFontSize, setShowSettingsMenu },
  } = useContext(AppContext);

  return (
    <>
      <MenuItem
        divider={true}
        onClick={() => {
          setShowSettingsMenu(true);
          setAnchorMainMenu(null);
        }}
      >
        {t('Settings')}
      </MenuItem>
      <DialogUI
        open={showSettingsMenu}
        onClose={() => {
          setShowSettingsMenu(false);
        }}
        classes={{
          root: { paper: 'intro-settings' },
        }}
        title={t('Settings')}
        maxWidth="sm"
      >
        <InputLabel className={classes.inputLabel} shrink>
          {t('Theme_label')}
        </InputLabel>
        <SelectTheme />

        <SwitchWordPopover />
        <SwitchExtraTitleCard />
        <SwitchChunks />
        <SwitchObsImage />
        <CopyLayout />
        <DownloadLayout />

        <SettingsItem title={t('Font_label')}>
          <FontSizeSlider
            onChange={setFontSize}
            marks={false}
            max={150}
            min={50}
            step={10}
            value={fontSize}
          />
        </SettingsItem>
      </DialogUI>
    </>
  );
}

export default Settings;
