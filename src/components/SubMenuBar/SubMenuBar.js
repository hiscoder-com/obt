import React,{useState} from 'react';


import BookSelect from '../BookSelect/BookSelect';
import { ChapterSelect } from '../ChapterSelect';

import {
  AppBar,
  Toolbar,
  Fab,
  MenuItem,
  Menu,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';

import { resourcesList } from '../../config';


const useStyles = makeStyles(() => ({
  root: {
    padding: '0 !important',
    margin: '0 1px !important',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  dragIndicator: {},
}));

function SubMenuBar(props) {

  const { setAppConfig, referenceSelected, setReferenceSelected, appConfig } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  

  const uniqChecking = (item) => {
    for (let i = 0; i < appConfig.length; i++) {
      if (appConfig[i].i === item) return true;
    }
  };

  const handleAddNew = (item) => {
    if (uniqChecking(item) !== true) {
      setAppConfig((prev) => prev.concat({ w: 4, h: 3, x: 0, y: 99, i: item }));
      handleClose();
    } else {
      handleClose();
    }
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
      <AppBar position="relative">
        <Toolbar>
          <Toolbar className={classes.addMenu}>
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
              {Object.keys(resourcesList).map((keyName, index) => (
                <MenuItem onClick={() => handleAddNew(keyName)}>
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
