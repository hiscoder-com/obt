import React, { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { defaultTplBible, defaultTplOBS } from '../../config/base';

/*

localhost:3000/share?r=ru_gl/ru_rlob&r=ru_gl/ru_tn&r=ru_gl/tg_rob&b=mrk&c=4&v=5

*/
export default function Share() {
  const getDataFromURI = useCallback((search) => {
    const params = new URLSearchParams(search);
    const resources = params.getAll('r');
    const bookId = params.get('b');
    const chapter = parseInt(params.get('c'));
    const verse = parseInt(params.get('v'));
    return { resources, bookId, chapter, verse };
  }, []);

  const { search } = useLocation();

  const { resources, bookId, chapter, verse } = getDataFromURI(search);

  const setReference = ({ bookId, chapter, verse }) => {
    let currentReference;
    try {
      currentReference = JSON.parse(localStorage.getItem('reference'));
    } catch (error) {
      localStorage.setItem(
        'reference',
        JSON.stringify({
          [bookId === 'obs' ? 'obs' : 'bible']: { bookId, chapter, verse },
        })
      );
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
    let currentLanguageResources;
    try {
      currentLanguageResources = JSON.parse(localStorage.getItem('languageResources'));
    } catch (error) {
      localStorage.setItem('languageResources', JSON.stringify([...new Set(langs)]));
    }
    localStorage.setItem(
      'languageResources',
      JSON.stringify([...new Set([...currentLanguageResources, ...langs])])
    );
  };

  const setResources = (resources, isObs) => {
    // create new layout
    const defaultAppConfig = {
      obs: defaultTplOBS['en'],
      bible: defaultTplBible['en'],
    };

    const lg = resources.map((el, index) => ({
      w: 4,
      h: 12,
      x: (index * 4) % 12,
      y: Math.floor(index / 3) * 12,
      i: el.split('/').join('__'),
      minW: 1,
      minH: 3,
    }));
    const md = resources.map((el, index) => ({
      w: 3,
      h: 12,
      x: (index * 3) % 6,
      y: Math.floor(index / 2) * 12,
      i: el.split('/').join('__'),
      minW: 1,
      minH: 3,
    }));
    const sm = resources.map((el, index) => ({
      w: 1,
      h: 4,
      x: 0,
      y: index * 4,
      i: el.split('/').join('__'),
      minH: 3,
      minW: 1,
    }));
    const newLayout = {
      lg,
      md,
      sm,
    };

    // get App Config
    let currentAppConfig;
    try {
      currentAppConfig = JSON.parse(localStorage.getItem('appConfig'));
    } catch (error) {
      localStorage.setItem(
        'appConfig',
        JSON.stringify({ ...defaultAppConfig, [isObs ? 'obs' : 'bible']: newLayout })
      );
    }

    const langs = currentAppConfig['bible']['lg'].map(
      (el) => el.i.split('__')[1].split('_')[0]
    );

    // save to layoutStorage

    let currentLayoutStorage;
    try {
      currentLayoutStorage = JSON.parse(localStorage.getItem('layoutStorage'));
    } catch (error) {
      localStorage.setItem(
        'layoutStorage',
        JSON.stringify([
          {
            name: 'preview',
            value: currentAppConfig,
            language: JSON.stringify([...new Set(langs)]),
            isObs: false,
          },
        ])
      );
    }
    localStorage.setItem(
      'layoutStorage',
      JSON.stringify([
        ...currentLayoutStorage,
        {
          name: 'preview' + Date.now(),
          value: currentAppConfig,
          language: JSON.stringify([...new Set(langs)]),
          isObs: false,
        },
      ])
    );
    // localStorage.setItem('layoutStorage', JSON.stringify());
  };

  useEffect(() => {
    if (bookId && chapter && resources && verse) {
      setReference({ bookId, chapter, verse });
      setLanguages(resources);
      setResources(resources, bookId === 'obs');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId, chapter, resources.length, verse]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.location.href = '/';
    }, 5000);
    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return <div>{JSON.stringify({ resources })}</div>;
}
