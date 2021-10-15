import { VERSION_KEY } from './Migrate';
import { gt } from 'semver';
const UPDATE_VERSION = '1.2.2';
export const migrate211015 = (v) => {
  if (gt(UPDATE_VERSION, v)) {
    fixUEB();
    fixAppConfig();
    localStorage.setItem(VERSION_KEY, UPDATE_VERSION);
  }
};

const fixUEB = () => {
  const appConfig = localStorage.getItem('appConfig');
  if (appConfig !== null) {
    const bible = JSON.parse(appConfig).bible;
    if (Array.isArray(bible)) {
      bible.map((el) => {
        if (el.i === 'en_ueb') {
          el.i = 'en_ult';
        }
        return el;
      });
      localStorage.setItem(
        'appConfig',
        JSON.stringify({ obs: JSON.parse(appConfig).obs, bible })
      );
    }
  }
};

const fixAppConfig = () => {
  const appConfig = localStorage.getItem('appConfig');
  if (appConfig !== null) {
    const bible = JSON.parse(appConfig).bible;
    const obs = JSON.parse(appConfig).obs;
    if (Array.isArray(bible)) {
      localStorage.setItem(
        'appConfig',
        JSON.stringify({
          obs: { lg: obs, md: obs, sm: obs },
          bible: { lg: bible, md: bible, sm: bible },
        })
      );
    }
  }
};
