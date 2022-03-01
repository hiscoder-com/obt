import React, { useContext } from 'react';
import { DialogUI, SelectTheme } from '..';
import SwitchChunks from './SwitchChunks';
import { AppContext } from '../../context';
import {
  Checkbox,
  Divider,
  FormControlLabel,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { FontSizeSlider } from 'translation-helps-rcl';
import { useStyles } from './style';
import SwitchWordPopover from './SwitchWordPopover';

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
        onClick={() => {
          setShowSettingsMenu(true);
          setAnchorMainMenu(null);
        }}
      >
        {t('Settings')}
      </MenuItem>
      <DialogUI
        className="dialog-settings"
        open={showSettingsMenu}
        onClose={() => {
          setShowSettingsMenu(false);
        }}
        classes={{ content: 'intro-settings' }}
        // isClosable
        // title={t('Settings')}
        maxWidth="sm"
      >
        <SelectTheme label={t('Select_theme')} />
        <Divider className={classes.divider} light />
        <InputLabel shrink>{t('WordPopoverLabel')}</InputLabel>
        <SwitchWordPopover />
        <Divider className={classes.divider} light />
        <InputLabel shrink>{t('ChunksLabel')}</InputLabel> <SwitchChunks />
        <Divider className={classes.divider} light />
        <InputLabel shrink>{t('OBSImages')}</InputLabel>
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
        <Divider className={classes.divider} light />
        <InputLabel shrink>{t('FontLabel')}</InputLabel>
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
