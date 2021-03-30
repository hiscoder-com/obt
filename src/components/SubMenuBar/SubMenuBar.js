import React from 'react';

import BookList from '../BookList/BookList';

import {
  AppBar,
  Button,
  Toolbar,
  Fab,
  Dialog,
  DialogContent,
  MenuItem,
  Menu,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';

import { bibleList, resourcesList } from '../../config';

const resourcesId = Object.keys(resourcesList);
console.log(resourcesId);
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
  const { setAppConfig, referenceSelected, setReferenceSelected, appConfig} = props;
  const [showBookSelect, setShowBookSelect] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const onBook = (project) => {
    setShowBookSelect(false);
    setReferenceSelected({
      ...referenceSelected,
      bookId: project ? project.identifier : null,
    });
  };
  const uniqChecking = (item) =>{

  }

  const handleAddNew = (item) =>{
     setAppConfig((prev) => prev.concat({ w: 4, h: 3, x: 0, y: 99, i: item }));
     handleClose();
    
    console.log(appConfig)
  }

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
              {resourcesId.map((item, key) => (
                <MenuItem onClick={()=> handleAddNew(item)}>{item}</MenuItem>
              ))}
            </Menu>
          </Toolbar>
          <Toolbar style={{ margin: '0 auto' }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setShowBookSelect(!showBookSelect)}
            >
              {
                bibleList.filter(
                  (book) => book.identifier === referenceSelected.bookId
                )[0]?.title
              }{' '}
            </Button>
            <Button
              style={{ marginLeft: '10px' }}
              variant="contained"
              color="secondary"
              onClick={() => setShowBookSelect(!showBookSelect)}
            >
              {referenceSelected.chapter} ch.
            </Button>
          </Toolbar>
        </Toolbar>
      </AppBar>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={showBookSelect}
        onClose={() => setShowBookSelect(false)}
      >
        <DialogContent>
          <BookList onBook={onBook} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SubMenuBar;
