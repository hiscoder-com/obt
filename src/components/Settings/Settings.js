import React, { useContext } from 'react';

import {
  Checkbox,
  Divider,
  FormControlLabel,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
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
} from '../../components';

import { useStyles } from './style';

function Settings({ setAnchorMainMenu }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    state: { fontSize, showObsImage, showSettingsMenu },
    actions: { setFontSize, setShowObsImage, setShowSettingsMenu },
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
        <Divider className={classes.divider} light />
        <InputLabel shrink>{t('Word_popover_label')}</InputLabel>
        <SwitchWordPopover />
        <Divider className={classes.divider} light />
        <InputLabel shrink>{t('Title_card_label')}</InputLabel>
        <SwitchExtraTitleCard />
        <Divider className={classes.divider} light />
        <InputLabel shrink>{t('Chunks_label')}</InputLabel> <SwitchChunks />
        <Divider className={classes.divider} light />
        <InputLabel shrink>{t('OBS_images')}</InputLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={showObsImage}
              onChange={(e) => {
                setShowObsImage((prev) => !prev);
              }}
            />
          }
          label={t('Show_OBS_label')}
        />
        <Divider className={classes.divider} light />
        <InputLabel className={classes.inputLabel} shrink>
          {t('Layout')}
        </InputLabel>
        <CopyLayout />
        <Divider className={classes.divider} light />
        <InputLabel className={classes.inputLabel} shrink>
          {t('Import_layout')}
        </InputLabel>
        <DownloadLayout />
        <Divider className={classes.divider} light />
        <InputLabel className={classes.inputLabel} shrink>
          {t('Font_label')}
        </InputLabel>
        <FontSizeSlider
          onChange={setFontSize}
          marks={false}
          max={150}
          min={50}
          step={10}
          value={fontSize}
        />
      </DialogUI>
    </>
  );
}

export default Settings;
