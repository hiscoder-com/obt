import { VERSION_KEY } from './Migrate';
import { gt } from 'semver';

import { getLanguageIds } from '../helper';
const UPDATE_VERSION = '1.4.0';
export const migrate211029 = (v) => {
  if (gt(UPDATE_VERSION, v)) {
    addLangs();
    localStorage.setItem('startDialog', true);
    localStorage.setItem(VERSION_KEY, UPDATE_VERSION);
  }
};

const addLangs = () => {
  const langIds = getLanguageIds();
  localStorage.setItem('languageResources', JSON.stringify(langIds));
};
