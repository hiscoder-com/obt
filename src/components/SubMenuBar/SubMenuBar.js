import React, { useState, useContext } from 'react';

import { AppContext } from '../../App.context';
import { BookSelect, ChapterSelect, TypoReport } from '../../components';
import SelectLanguage from '../MenuBar/SelectLanguage/SelectLanguage';
import { AppBar, Toolbar, MenuItem, Menu, IconButton } from '@material-ui/core';

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

  const uniqueResources = getUniqueResources(appConfig);
  const { t } = useTranslation();

  const handleAddMaterial = (item) => {
    setAppConfig((prev) => prev.concat({ ...defaultCard, i: item }));
    handleCloseAddMaterial();
  };

  const handleClickAddMaterial = (event) => {
    setAnchorAddMaterial(event.handleClickMainMenu);
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
              <MenuItem onClick={() => handleClickAddMaterial()}>+ Add material</MenuItem>
              <MenuItem> Error Report</MenuItem>
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
          <TypoReport />
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
