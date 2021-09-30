import React, { useState, useContext, useRef } from 'react';

import { FontSizeSlider } from 'translation-helps-rcl';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { decodeBase64ToUtf8 } from 'gitea-react-toolkit';
import YAML from 'js-yaml-parser';

import { AppContext } from '../../context';
import {
  BookSelect,
  WorkspaceManager,
  SearchResources,
  ChapterSelect,
  SelectLanguage,
  ShowReference,
  SelectModeBible,
} from '../../components';

import { AppBar, Toolbar, MenuItem, Menu, IconButton, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import { useStyles, useModalStyles, useAddStyles } from './style';

function SubMenuBar() {
  const {
    state: { fontSize, loadIntro, openMainMenu, appConfig, resourcesApp },
    actions: { setFontSize, setLoadIntro },
  } = useContext(AppContext);

  const menuRef = useRef(null);

  const classes = useStyles();
  const addClasses = useAddStyles();
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
  const handleCached = () => {
    appConfig.forEach(async (el) => {
      const res = resourcesApp.filter((r) => r.name === el.i)[0];
      const url =
        'https://git.door43.org/api/v1/repos/' +
        res.owner +
        '/' +
        res.name +
        '/contents/';
      axios.get(url + 'manifest.yaml?ref=master').then((result) => {
        const json = YAML.safeLoad(decodeBase64ToUtf8(result.data.content));
        if (json?.dublin_core) {
          json.projects.forEach((pr) => {
            axios.get(url + pr.path.substring(2) + '?ref=master');
            console.log(pr.path);
          });
        }
      });
    });
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
          <div className={classes.reference}>
            <SelectModeBible />
          </div>
          <div className={classes.centerButtons}>
            <ShowReference />
            <ChapterSelect />
            <BookSelect />
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
            <MenuItem onClick={handleCached}>Cached</MenuItem>
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
