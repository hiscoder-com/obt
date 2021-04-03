import React, { useState } from 'react';

import BookSelect from '../BookSelect/BookSelect';
import { ChapterSelect } from '../ChapterSelect';

import { AppBar, Toolbar, Fab, MenuItem, Menu } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

import { resourcesList } from '../../config';

import { getUniqueResources } from '../../helper';

import useStyles from './styled';

function SubMenuBar(props) {
  const { setAppConfig, referenceSelected, setReferenceSelected, appConfig } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const uniqueResources = getUniqueResources(appConfig);

  const handleAddNew = (item) => {
    setAppConfig((prev) => prev.concat({ w: 4, h: 3, x: 0, y: 99, i: item }));

    handleClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();

  return (
    <>
      <AppBar position="relative" className={classes.button}>
        <Toolbar>
          <Toolbar>
            <Fab color="primary" aria-label="add" onClick={handleClick}>
              <AddIcon />
            </Fab>
            <Menu
              color="transparent"
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {Object.keys(uniqueResources).map((keyName, index) => (
                <MenuItem key={index} onClick={() => handleAddNew(keyName)}>
                  {resourcesList[keyName].title}
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
          <Toolbar style={{ margin: '0 auto' }}>
            <BookSelect
              referenceSelected={referenceSelected}
              setReferenceSelected={setReferenceSelected}
            />
            <ChapterSelect
              referenceSelected={referenceSelected}
              setReferenceSelected={setReferenceSelected}
            />
          </Toolbar>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default SubMenuBar;
