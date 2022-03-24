import { VERSION_KEY } from './Migrate';
import { gt } from 'semver';
const UPDATE_VERSION = '1.6.0';
export const migrate220222 = (v) => {
  if (gt(UPDATE_VERSION, v)) {
    fixFunction();
    //localStorage.setItem(VERSION_KEY, UPDATE_VERSION);
  }
};

const fixFunction = () => {
  const appConfig = localStorage.getItem('appConfig');
  const resourcesAppJson = localStorage.getItem('resourcesApp');
  if (appConfig !== null && resourcesAppJson !== null) {
    let resourceOwner = {};
    const resourcesApp = JSON.parse(resourcesAppJson);
    for (const key in resourcesApp) {
      if (Object.hasOwnProperty.call(resourcesApp, key)) {
        const el = resourcesApp[key];
        resourceOwner[el.name] = el.owner + '__' + el.name;
      }
    }
    let newBible = JSON.parse(appConfig).bible;
    newBible.lg = newBible.lg.map((card) => ({
      ...card,
      i: resourceOwner[card.i] ?? card.i,
    }));
    newBible.md = newBible.md.map((card) => ({
      ...card,
      i: resourceOwner[card.i] ?? card.i,
    }));
    newBible.sm = newBible.sm.map((card) => ({
      ...card,
      i: resourceOwner[card.i] ?? card.i,
    }));
    let newObs = JSON.parse(appConfig).obs;
    newObs.lg = newObs.lg.map((card) => ({
      ...card,
      i: resourceOwner[card.i] ?? card.i,
    }));
    newObs.md = newObs.md.map((card) => ({
      ...card,
      i: resourceOwner[card.i] ?? card.i,
    }));
    newObs.sm = newObs.sm.map((card) => ({
      ...card,
      i: resourceOwner[card.i] ?? card.i,
    }));
    localStorage.setItem('appConfig', JSON.stringify({ obs: newObs, bible: newBible }));
  }
};
