import { resourcesList } from './config';

export const getResources = (appConfig) => {
  const resources = [];
  appConfig.forEach((el) => {
    if (resourcesList[el.i].type === 'bible') {
      resources.push(resourcesList[el.i].link);
    }
  });
  resources === [] && resources.push(resourcesList['rob'].link);
  return resources;
};
