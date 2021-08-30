import React, { useState, useContext, useRef } from 'react';

import { FontSizeSlider } from 'translation-helps-rcl';
import { useTranslation } from 'react-i18next';

import { AppContext, ReferenceContext } from '../../context';
import {
  BookSelect,
  WorkspaceManager,
  SearchResources,
  ChapterSelect,
  SelectLanguage,
} from '../../components';

import {
  AppBar,
  Toolbar,
  MenuItem,
  Menu,
  IconButton,
  Typography,
} from '@material-ui/core';
import { AddIcon, MenuIcon } from '@material-ui/icons';
import { useStyles, useModalStyles } from './style';

function SubMenuBar() {
  const {
    state: { fontSize, loadIntro, openMainMenu },
    actions: { setFontSize, setLoadIntro },
  } = useContext(AppContext);

  const {
    state: {
      referenceSelected: { bookId },
    },
  } = useContext(ReferenceContext);
  const menuRef = useRef(null);

  const classes = useStyles();

  const modalClasses = useModalStyles();
  const [anchorMainMenu, setAnchorMainMenu] = useState(null);
  const [anchorAddMaterial, setAnchorAddMaterial] = useState(null);

  const { t } = useTranslation();

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
  const handleOpenUsersGuide = () => {
    setLoadIntro(true);
    handleCloseMainMenu();
  };

  const anchorEl = loadIntro && anchorMainMenu ? anchorMainMenu : menuRef.current;

  return (
    <>
      <AppBar className={'intro-appBar'} position="relative">
        <Toolbar className={classes.grow}>
          <Typography variant="h6" color="inherit">
            Bible App
          </Typography>
          <div className={classes.centerButtons}>
            {bookId !== 'obs' ? <BookSelect /> : ''}
            <ChapterSelect />
          </div>

          <IconButton
            ref={menuRef}
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
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorMainMenu) || openMainMenu}
            onClose={handleCloseMainMenu}
            classes={modalClasses}
            PopoverClasses={{ paper: 'intro-hamburger' }}
          >
            <MenuItem onClick={handleClickAddMaterial}>
              <AddIcon size={'small'} /> {t('Add_resources')}
            </MenuItem>
            <MenuItem button={false} divider={true}>
              <FontSizeSlider
                onChange={setFontSize}
                marks={false}
                max={150}
                min={50}
                step={10}
                value={fontSize}
              />
            </MenuItem>
            <MenuItem button={false} divider={true}>
              <p className={classes.menu}>{t('Text_under_checkbox_error')}</p>
            </MenuItem>
            <WorkspaceManager onClose={handleCloseMainMenu} />
            <MenuItem button={false} divider={true}>
              <SelectLanguage />
            </MenuItem>
            <MenuItem onClick={handleOpenUsersGuide}>{t('UsersGuide')}</MenuItem>
          </Menu>
          <SearchResources
            anchorEl={anchorAddMaterial}
            onClose={handleCloseAddMaterial}
            open={Boolean(anchorAddMaterial)}
          />
        </Toolbar>
      </AppBar>
    </>
  );
}

export default SubMenuBar;
