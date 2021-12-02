import React, { useState, useContext, useRef } from 'react';

import { FontSizeSlider } from 'translation-helps-rcl';
import { useTranslation } from 'react-i18next';
import localforage from 'localforage';

import { AppContext } from '../../context';
import {
  BookSelect,
  WorkspaceManager,
  SearchResources,
  ChapterSelect,
  SelectLanguage,
  ShowReference,
  SelectModeBible,
  About,
} from '../../components';

import { AppBar, Toolbar, MenuItem, Menu, IconButton, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import { useStyles, useModalStyles, useAddStyles } from './style';

function Upload() {
  const onChange = (evt) => {
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      caches.open('uw-git-cache').then(function (cache) {
        let blob = new Blob([reader.result]);
        var init = { status: 200, statusText: 'OK' };
        let res = new Response(blob, init);
        const uri =
          'https://git.door43.org/api/v1/repos/ru_gl/ru_rlob/contents/57-TIT.usfm?ref=master';
        let req = new Request(uri);
        cache.put(req, res);
        const cacheStore = localforage.createInstance({
          driver: [localforage.INDEXEDDB],
          name: 'web-cache',
        });
        blob.text().then((res) => {
          cacheStore.setItem(uri, { expiries: '1999999999999', data: { data: res } });
        });
      });
    };

    reader.readAsArrayBuffer(file);
  };
  return (
    <>
      <input
        type="file"
        onChange={onChange}
        name="file"
        className="file"
        accept=".usfm"
      />
    </>
  );
}

function SubMenuBar() {
  const {
    state: { fontSize, loadIntro, openMainMenu },
    actions: { setFontSize, setLoadIntro },
  } = useContext(AppContext);

  const menuRef = useRef(null);

  const classes = useStyles();
  const addClasses = useAddStyles();
  const modalClasses = useModalStyles();
  const [anchorMainMenu, setAnchorMainMenu] = useState(null);
  const [anchorAddMaterial, setAnchorAddMaterial] = useState(null);
  const [openAbout, setOpenAbout] = useState(false);

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
  const handleClickOpenAbout = () => {
    setOpenAbout(true);
  };

  const anchorEl = loadIntro && anchorMainMenu ? anchorMainMenu : menuRef.current;

  return (
    <>
      <AppBar className={'intro-appBar'} position="relative">
        <Toolbar className={classes.grow}>
          <div className={classes.reference}>
            <SelectModeBible />
          </div>
          <div className={classes.centerButtons}>
            <ShowReference />
            <ChapterSelect />
            <BookSelect />
            <Upload />
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
            <MenuItem button={false}>
              <Button
                startIcon={<AddIcon size={'small'} />}
                onClick={handleClickAddMaterial}
                classes={addClasses}
                variant="outlined"
                color="primary"
                size="small"
                fullWidth
              >
                {t('Add_resources')}
              </Button>
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
              <SelectLanguage label={t('Interface_lang')} />
            </MenuItem>
            <MenuItem onClick={handleOpenUsersGuide} divider={true}>
              {t('UsersGuide')}
            </MenuItem>
            <About
              open={openAbout}
              setOpen={setOpenAbout}
              handleClick={handleClickOpenAbout}
            />
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
