import React, { useState, useContext } from 'react';

import { AppContext } from '../../App.context';
import { BookSelect, ChapterSelect, TypoReport } from '../../components';
import SelectLanguage from '../SelectLanguage/SelectLanguage';
import {
  AppBar,
  Toolbar,
  MenuItem,
  Menu,
  IconButton,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  FormControl,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';

import { useTranslation } from 'react-i18next';

import useStyles from './style';

import { getUniqueResources } from '../../helper';
import { defaultCard } from '../../config';

function SubMenuBar() {
  const { state, actions } = useContext(AppContext);
  const { appConfig } = state;
  const { setAppConfig } = actions;

  const classes = useStyles();

  const [anchorAddMaterial, setAnchorAddMaterial] = useState(null);
  const [anchorMainMenu, setAnchorMainMenu] = useState(null);
  const [errorReport, setErrorReport] = useState(false);

  const uniqueResources = getUniqueResources(appConfig);
  const { t } = useTranslation();

  const handleAddMaterial = (item) => {
    setAppConfig((prev) => prev.concat({ ...defaultCard, i: item }));
    handleCloseAddMaterial();
  };

  const handleClickAddMaterial = (event) => {
    setAnchorAddMaterial(event.currentTarget);
    handleCloseMainMenu();
  };
  const handleClickMainMenu = (event) => {
    setAnchorMainMenu(event.currentTarget);
  };

  const handleCloseMainMenu = () => {
    setAnchorMainMenu(null);
  };
  const handleCloseAddMaterial = () => {
    setAnchorAddMaterial(null);
  };
  const handleClickErrorReport = () => {
    setErrorReport((prev) => !prev);
  };

  return (
    <>
      <AppBar position="relative">
        <Toolbar className={classes.grow}>
          <Typography variant="h6" color="inherit">
            Bible App
          </Typography>
          <div className={classes.centerButtons}>
            <BookSelect />
            <ChapterSelect />
          </div>
          <div className={classes.report}>{errorReport ? <TypoReport /> : ''}</div>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleClickMainMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            color="transparent"
            anchorEl={anchorMainMenu}
            keepMounted
            open={Boolean(anchorMainMenu)}
            onClose={handleCloseMainMenu}
          >
            <MenuItem>
              <SelectLanguage />
            </MenuItem>
            <MenuItem onClick={handleClickAddMaterial}>
              <AddIcon size={'small'} /> {t('Add_material')}
            </MenuItem>
            <MenuItem>
              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={errorReport}
                      onChange={handleClickErrorReport}
                      name="checkedA"
                      color="primary"
                    />
                  }
                  label={t('Error_report')}
                ></FormControlLabel>
                <FormHelperText>
                  {t('Text_under_checkbox_error1')}
                  <br />
                  {t('Text_under_checkbox_error2')}
                </FormHelperText>
              </FormControl>
            </MenuItem>
          </Menu>
          <Menu
            color="transparent"
            anchorEl={anchorAddMaterial}
            keepMounted
            open={Boolean(anchorAddMaterial)}
            onClose={handleCloseAddMaterial}
          >
            {Object.keys(uniqueResources).map((keyName, index) => (
              <MenuItem key={index} onClick={() => handleAddMaterial(keyName)}>
                {t(keyName)}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default SubMenuBar;
