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
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';

import { useTranslation } from 'react-i18next';

import { getUniqueResources } from '../../helper';
import { defaultCard } from '../../config';

function SubMenuBar() {
  const { state, actions } = useContext(AppContext);
  const { appConfig } = state;
  const { setAppConfig } = actions;

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
        <Toolbar>
          Bible App
          <Toolbar>
            <Menu
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
                />
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
          <Toolbar style={{ margin: '0 auto' }}>
            <BookSelect />
            <ChapterSelect />
          </Toolbar>
          {errorReport ? <TypoReport /> : []}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleClickMainMenu}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default SubMenuBar;
