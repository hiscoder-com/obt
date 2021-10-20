import React, { useState, useEffect, useContext, useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { getResources, getBookList } from '../helper';
import { server, bibleList } from '../config/base';

export const ResourceContext = React.createContext();

let _resourcesApp = localStorage.getItem('resourcesApp')
  ? JSON.parse(localStorage.getItem('resourcesApp'))
  : [];
/** TODO
 * 1. Get information about resources ( like available bookId) from /Chapter  - content.resources.project.
 * 2. Put all states about resources here.
 * 3. Maybe make availableBookList here
 */
/** должен содержать данные репозиториев открытых проектов, еще мы его используем чтобы получать список книг которые есть в репо */
export function ResourceContextProvider({ children }) {
  const [resourcesApp, setResourcesApp] = useState(_resourcesApp);

  const _resourceLinks = getResources(appConfig, resourcesApp);
  const [resourceLinks, setResourceLinks] = useState(_resourceLinks);
  const [resources, setResources] = useState([]);

  const { t } = useTranslation();

  const {
    state: { referenceSelected },
    actions: { setNewBookList, getFilteredBookList },
  } = useContext(ReferenceContext);

  useEffect(() => {
    setResourceLinks(getResources(appConfig, resourcesApp));
  }, [appConfig, resourcesApp]);

  const availableBookList = useMemo(() => [], []);

  if (state.resources.length > 0) {
    state.resources.forEach((resource) => {
      resource.projects.map((project) => availableBookList.push(project.identifier));
    });
  }

  useEffect(() => {
    applyBooksFilter(availableBookList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableBookList]);

  const value = {};

  return <ResourceContextProvider value={value}>{children}</ResourceContextProvider>;
}
