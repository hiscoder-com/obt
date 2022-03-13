import { MenuItem } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

function useCurrentResource({ resourcesApp, appConfig }) {
  const [resourcesBible, setResourcesBible] = useState();
  const [optionsBible, setOptionsBible] = useState();

  useDeepCompareEffect(() => {
    const currentResources =
      resourcesApp &&
      appConfig &&
      resourcesApp.filter((e) =>
        appConfig.lg
          .map((e) => {
            const resources = e.i.split('__');

            return resources[1];
          })
          .includes(e.name)
      );

    const _resources = currentResources.filter((e) => {
      return (
        /bible/.test(e.subject.toLowerCase()) || /testament/.test(e.subject.toLowerCase())
      );
    });

    setResourcesBible(_resources);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appConfig]);

  useEffect(() => {
    if (resourcesBible) {
      const options = resourcesBible.map((el) => {
        const { languageId, name, owner } = el;
        return (
          <MenuItem key={el.id} value={JSON.stringify({ languageId, name, owner })}>
            {el.title}
          </MenuItem>
        );
      });
      setOptionsBible(options);
    }
  }, [resourcesBible]);

  return { resourcesBible, optionsBible };
}

export default useCurrentResource;
