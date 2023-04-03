import React, { useContext } from 'react';

import { InputLabel, ListItemIcon, MenuItem } from '@material-ui/core';
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
  SwitchMasterOnly,
  SettingsItem,
  SwitchTypeFilterWords,
} from '../../components';

import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';

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
        <ListItemIcon>
          <SettingsRoundedIcon fontSize="small" />
        </ListItemIcon>
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
        <SwitchTypeFilterWords />

        <SwitchWordPopover />
        <SwitchExtraTitleCard />
        <SwitchChunks />
        <SwitchObsImage />
        <SwitchMasterOnly />
        <CopyLayout />
        <DownloadLayout />

        <SettingsItem title={t('Font_label')}>
          <FontSizeSlider
            onChange={setFontSize}
            marks={false}
            max={250}
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
