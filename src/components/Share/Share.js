import React, { useCallback, useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { defaultTplBible, defaultTplOBS } from '../../config/base';

import { useStyles } from './style';
import {
  Box,
  Button,
  Card,
  CardContent,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';

const currentAppConfig = JSON.parse(localStorage.getItem('appConfig'));

export default function Share() {
  const classes = useStyles();

  const { t } = useTranslation();

  const { search } = useLocation();

  const [saveOption, setSaveOption] = useState('old');
  const [newName, setNewName] = useState(t('Autosave'));
  const [reload, setReload] = useState(() => currentAppConfig === null);

  const getDataFromURI = useCallback((search) => {
    const params = new URLSearchParams(search);
    const resources = params.getAll('r');
    const bookId = params.get('b');
    const chapter = parseInt(params.get('c'));
    const verse = parseInt(params.get('v'));
    return { resources, bookId, chapter, verse };
  }, []);

  const { resources, bookId, chapter, verse } = getDataFromURI(search);

  const setReference = ({ bookId, chapter, verse }) => {
    const currentReference = JSON.parse(localStorage.getItem('reference'));
    if (currentReference === null) {
      localStorage.setItem(
        'reference',
        JSON.stringify({
          [bookId === 'obs' ? 'obs' : 'bible']: { bookId, chapter, verse },
        })
      );
      return;
    }
    localStorage.setItem(
      'reference',
      JSON.stringify({
        ...currentReference,
        [bookId === 'obs' ? 'obs' : 'bible']: { bookId, chapter, verse },
      })
    );
  };

  const setLanguages = (resources) => {
    const langs = resources.map((el) => el.split('/')[1].split('_')[0]);
    const currentLanguageResources = JSON.parse(
      localStorage.getItem('languageResources')
    );
    if (currentLanguageResources === null) {
      localStorage.setItem('languageResources', JSON.stringify([...new Set(langs)]));
      localStorage.setItem('startDialog', false);
      localStorage.setItem('switchWordPopover', true);
      localStorage.setItem('theme', 'textTree');
    } else {
      localStorage.setItem(
        'languageResources',
        JSON.stringify([...new Set([...currentLanguageResources, ...langs])])
      );
    }
  };

  const getNewLayout = (resources) => {
    // create new layout
    const lgHeight = Math.ceil(12 / Math.ceil(resources.length / 3));

    const lg = resources.map((el, index) => ({
      w: resources.length === 1 ? 8 : 4,
      h: lgHeight,
      x: (index * 4) % 12,
      y: Math.floor(index / 3) * lgHeight,
      i: el.split('/').join('__'),
      minW: 1,
      minH: 3,
    }));
    const mdHeight = Math.ceil(12 / Math.ceil(resources.length / 2));

    const md = resources.map((el, index) => ({
      w: 3,
      h: mdHeight,
      x: (index * 3) % 6,
      y: Math.floor(index / 2) * mdHeight,
      i: el.split('/').join('__'),
      minW: 1,
      minH: 3,
    }));
    const sm = resources.map((el, index) => ({
      w: 1,
      h: resources.length === 1 ? 8 : 4,
      x: 0,
      y: index * 4,
      i: el.split('/').join('__'),
      minH: 3,
      minW: 1,
    }));

    return {
      lg,
      md,
      sm,
    };
  };

  const setResources = (resources, isOBS) => {
    // get App Config
    const defaultAppConfig = {
      obs: defaultTplOBS['en'],
      bible: defaultTplBible['en'],
    };

    const newLayout = getNewLayout(resources);
    if (currentAppConfig === null) {
      localStorage.setItem(
        'appConfig',
        JSON.stringify({ ...defaultAppConfig, [isOBS ? 'obs' : 'bible']: newLayout })
      );
      return;
    }
    localStorage.setItem(
      'appConfig',
      JSON.stringify({ ...currentAppConfig, [isOBS ? 'obs' : 'bible']: newLayout })
    );

    const langs = currentAppConfig[isOBS ? 'obs' : 'bible']['lg'].map(
      (el) => el.i.split('__')[1].split('_')[0]
    );
    // save to layoutStorage
    let newLayoutName = newName;
    const currentLayoutStorage = JSON.parse(localStorage.getItem('layoutStorage'));
    if (currentLayoutStorage === null || currentLayoutStorage.length === 0) {
      localStorage.setItem(
        'layoutStorage',
        JSON.stringify([
          {
            name: newLayoutName,
            value: currentAppConfig[isOBS ? 'obs' : 'bible'],
            language: [...new Set(langs)],
            isOBS,
          },
        ])
      );
      return;
    }
    const layoutNames = currentLayoutStorage.map((item) => item.name);
    let index = 0;
    while (layoutNames.includes(newLayoutName)) {
      newLayoutName = newName + ' ' + ++index;
    }

    const isLayoutSaved = currentLayoutStorage.every((item) => {
      return (
        JSON.stringify(item.value) !==
        JSON.stringify(currentAppConfig[isOBS ? 'obs' : 'bible'])
      );
    });

    if (isLayoutSaved) {
      localStorage.setItem(
        'layoutStorage',
        JSON.stringify([
          ...currentLayoutStorage,
          {
            name: newLayoutName,
            value: currentAppConfig[isOBS ? 'obs' : 'bible'],
            language: [...new Set(langs)],
            isOBS,
          },
        ])
      );
    }
  };

  const saveNewResources = (resources, isOBS) => {
    const newLayout = getNewLayout(resources);

    const langs = newLayout['lg'].map((el) => el.i.split('__')[1].split('_')[0]);

    // save to layoutStorage
    let newLayoutName = newName;
    const currentLayoutStorage = JSON.parse(localStorage.getItem('layoutStorage'));
    if (currentLayoutStorage === null || currentLayoutStorage.length === 0) {
      localStorage.setItem(
        'layoutStorage',
        JSON.stringify([
          {
            name: newLayoutName,
            value: newLayout,
            language: [...new Set(langs)],
            isOBS,
          },
        ])
      );
      return;
    }
    const layoutNames = currentLayoutStorage.map((item) => item.name);
    let index = 0;
    while (layoutNames.includes(newLayoutName)) {
      newLayoutName = newName + ' ' + ++index;
    }

    const isLayoutSaved = currentLayoutStorage.every((item) => {
      return JSON.stringify(item.value) !== JSON.stringify(newLayout);
    });

    if (isLayoutSaved) {
      localStorage.setItem(
        'layoutStorage',
        JSON.stringify([
          ...currentLayoutStorage,
          {
            name: newLayoutName,
            value: newLayout,
            language: [...new Set(langs)],
            isOBS,
          },
        ])
      );
    }
  };

  useEffect(() => {
    if (reload || currentAppConfig === null) {
      if (bookId && chapter && resources && verse) {
        if (saveOption === 'old') {
          setReference({ bookId, chapter, verse });
          setLanguages(resources);
          setResources(resources, bookId === 'obs');
        } else {
          saveNewResources(resources, bookId === 'obs');
        }
      }
      const params = new URLSearchParams(window.location.search);
      const _bookId = params.get('b');
      const _chapter = params.get('c');
      const _verse = params.get('v');

      const timer = window.setTimeout(() => {
        window.location.href = `/${_bookId}/${_chapter}/${_verse}`;
      }, 3000);

      return () => {
        window.clearTimeout(timer);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, currentAppConfig]);

  const handleChange = (e) => {
    setSaveOption(e.target.value);
  };

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const handleSave = () => {
    setReload(true);
  };

  return (
    <div className={classes.background}>
      {currentAppConfig !== null ? (
        <Card className={classes.root}>
          <CardContent>
            <Typography gutterBottom paragraph variant="h4">
              {t('Warning')}
            </Typography>
            <Typography gutterBottom paragraph>
              {t('Share1')}
            </Typography>
            <Typography gutterBottom paragraph>
              {t('Share2')}
            </Typography>
            <Typography gutterBottom paragraph>
              {t('Share3')}
            </Typography>
            <Box mb={3}>
              <TextField
                select
                className={classes.select}
                value={saveOption}
                onChange={handleChange}
              >
                <MenuItem value={'old'}>{t('Share_show_new')}</MenuItem>
                <MenuItem value={'new'}>{t('Share_show_old')}</MenuItem>
              </TextField>
            </Box>
            <Box mb={3}>
              <InputLabel>{t('Share_new_name')}</InputLabel>
              <TextField
                className={classes.select}
                value={newName}
                onChange={handleNewName}
              />
            </Box>
            <Box textAlign={'right'}>
              <Button
                variant="contained"
                disabled={newName.length === 0}
                onClick={handleSave}
              >
                {t('Done')}
              </Button>
              {reload && (
                <Typography variant="subtitle2" color="textSecondary">
                  {t('Page_reload_after_3_sec')}
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="subtitle2" color="textSecondary">
          {t('Page_reload_after_3_sec')}
        </Typography>
      )}
    </div>
  );
}
