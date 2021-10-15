import { migrate211015 } from './migrate211015';
import * as package_json from '../../package.json';
import { gt } from 'semver';

const VERSION_KEY = 'version';
/**
 * start all migrations here
 */
export default function Migrate() {
  const v = getVersion();
  if (gt('1.2.0', v)) {
    migrate211015(v);
  }
}

/**
 * get current version of app
 * If there is nothing in the repository, then install the latest version.
 * Otherwise, install version 1.2.1, since it was in it that we introduced versioning.
 * @returns current version of app
 */
const getVersion = () => {
  let lsVersion = localStorage.getItem(VERSION_KEY);
  if (lsVersion === null) {
    if (localStorage.getItem('i18nextLng') === null) {
      lsVersion = package_json.version;
    } else {
      lsVersion = '1.1.0';
    }
    localStorage.setItem(VERSION_KEY, lsVersion);
  }
  return lsVersion;
};
