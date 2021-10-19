import React, { useState, useEffect, useContext /**useMemo*/ } from 'react';

import { getResources, checkLSVal } from '../helper';
import { bibleList } from '../config/base';
import { AppContext, ReferenceContext } from '../context';

export const ResourceContext = React.createContext();

// let _resourcesApp = localStorage.getItem('resourcesApp')
// ? JSON.parse(localStorage.getItem('resourcesApp'))
// : [];

/** должен содержать данные репозиториев открытых проектов, еще мы его используем чтобы получать список книг которые есть в репо */
export function ResourceContextProvider({ children }) {
  const {
    state: { appConfig },
  } = useContext(AppContext);

  const _resourcesApp = checkLSVal('resourcesApp', [], 'object');
  const [resourcesApp, setResourcesApp] = useState(_resourcesApp);

  const _resourceLinks = getResources(appConfig, resourcesApp);
  const [resourceLinks, setResourceLinks] = useState(_resourceLinks);
  const [resources, setResources] = useState([]);
  console.log(_resourceLinks);
  console.log({ resourcesApp });
  useEffect(() => {
    setResources(resourcesApp.filter((el) => resourceLinks.includes(el.link)));
  }, [resourcesApp, resourceLinks]);
  console.log(resources);
  const {
    state: {
      referenceSelected: { bookId },
    },
    actions: { setNewBookList, getFilteredBookList },
  } = useContext(ReferenceContext);

  useEffect(() => {
    setResourceLinks(getResources(appConfig, resourcesApp));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appConfig, resourcesApp]);

  // const availableBookList.push = useMemo(() => [], []);

  // const availableBookList = React.useMemo(() => {
  //   const newBookList = [];
  //   if (bookId === 'obs') {
  //     newBookList.push('obs');
  //   } else {
  //     if (resources.length > 0) {
  //       resources.forEach((resource) => {
  //         if (resource.projects) {
  //           resource.projects.forEach((project) => {
  //             if (!newBookList.includes(project.identifier)) {
  //               newBookList.push(project.identifier);
  //             }
  //           });
  //         }
  //       });
  //     }
  //   }
  //   return newBookList;
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [resources.length, bookId]);

  // if (state.resources.length > 0) {
  //   state.resources.forEach((resource) => {
  //     resource.projects.map((project) => availableBookList.push(project.identifier));
  //   });
  // }

  // useEffect(() => {
  //   applyBooksFilter(availableBookList);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [availableBookList]);

  const value = {
    state: {
      resources,
      resourceLinks,
    },
    actions: { setResourcesApp },
  };

  return <ResourceContext.Provider value={value}>{children}</ResourceContext.Provider>;
}
