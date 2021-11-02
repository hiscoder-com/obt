import { VERSION_KEY } from './Migrate';
import { gt } from 'semver';
const UPDATE_VERSION = 'X.X.X';
export const migrateyymmdd = (v) => {
  if (gt(UPDATE_VERSION, v)) {
    fixFunction();
    localStorage.setItem(VERSION_KEY, UPDATE_VERSION);
  }
};

const fixFunction = () => {
  // write code here
};
