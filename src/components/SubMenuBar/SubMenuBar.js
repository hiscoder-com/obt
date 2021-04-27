import React, { useState, useContext } from 'react';

import { AppContext } from '../../App.context';
import { BookSelect, ChapterSelect } from '../../components';

import { AppBar, Toolbar, Fab, MenuItem, Menu, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';

import { useTranslation } from 'react-i18next';

import { getUniqueResources } from '../../helper';
import { defaultCard } from '../../config';

function SubMenuBar() {
  const { state, actions } = useContext(AppContext);
  const { appConfig } = state;
  const { setAppConfig } = actions;

  const [anchorEl, setAnchorEl] = useState(null);

  const uniqueResources = getUniqueResources(appConfig);
  const { t } = useTranslation();

  const handleAddNew = (item) => {
    setAppConfig((prev) => prev.concat({ ...defaultCard, i: item }));

    handleClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Toolbar>
            {/* <Fab color="primary" aria-label="add" onClick={handleClick}>
              <AddIcon />
            </Fab> */}
            <Menu
              color="transparent"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {Object.keys(uniqueResources).map((keyName, index) => (
                <MenuItem key={index} onClick={() => handleAddNew(keyName)}>
                  {t(keyName)}
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
          <Toolbar style={{ margin: '0 auto' }}>
            <BookSelect />
            <ChapterSelect />
          </Toolbar>

          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default SubMenuBar;
