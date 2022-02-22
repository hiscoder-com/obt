import { VERSION_KEY } from './Migrate';
import { gt } from 'semver';
const UPDATE_VERSION = '1.6.0';
export const migrate220222 = (v) => {
  if (gt(UPDATE_VERSION, v)) {
    fixFunction();
    localStorage.setItem(VERSION_KEY, UPDATE_VERSION);
  }
};

const fixFunction = () => {
  const appConfig = localStorage.getItem('appConfig');
  const resourcesAppJson = localStorage.getItem('resourcesApp');
  if (appConfig !== null && resourcesAppJson !== null) {
    let resourceOwner = [];
    const resourcesApp = JSON.parse(resourcesAppJson);
    for (const key in resourcesApp) {
      if (Object.hasOwnProperty.call(resourcesApp, key)) {
        const el = resourcesApp[key];
        resourceOwner[el.name] = el.owner + '__' + el.name;
      }
    }
    const newBible = JSON.parse(appConfig).bible;
    newBible.lg.map((card) => ({ ...card, i: resourceOwner?.[card.i] }));
    newBible.md.map((card) => ({ ...card, i: resourceOwner?.[card.i] }));
    newBible.sm.map((card) => ({ ...card, i: resourceOwner?.[card.i] }));
    const newObs = JSON.parse(appConfig).obs;
    newObs.lg.map((card) => ({ ...card, i: resourceOwner?.[card.i] }));
    newObs.md.map((card) => ({ ...card, i: resourceOwner?.[card.i] }));
    newObs.sm.map((card) => ({ ...card, i: resourceOwner?.[card.i] }));

    localStorage.setItem('appConfig', JSON.stringify({ obs: newObs, bible: newBible }));
  }
};
