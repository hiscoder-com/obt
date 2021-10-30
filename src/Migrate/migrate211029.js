import { VERSION_KEY } from './Migrate';
import { gt } from 'semver';

const UPDATE_VERSION = '1.4.0';
export const migrate211029 = (v) => {
  if (gt(UPDATE_VERSION, v)) {
    localStorage.setItem(VERSION_KEY, UPDATE_VERSION);
  }
};
