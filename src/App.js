import React, { useState, useEffect, useMemo } from 'react';

import {
  ResourcesContextProvider,
  ReferenceSelectedContextProvider,
} from 'scripture-resources-rcl';

import { Workspace } from 'resource-workspace-rcl';
import { MenuBar, SubMenuBar, TypoReport, Card } from './components';

import { getResources } from './helper';

import { makeStyles } from '@material-ui/core/styles';
import './styles/app.css';

const config = { server: 'https://git.door43.org' };

const _appConfig = localStorage.getItem('appConfig')
  ? JSON.parse(localStorage.getItem('appConfig'))
  : [
      { w: 4, h: 5, x: 0, y: 0, i: 'rob' },
      { w: 4, h: 5, x: 4, y: 0, i: 'tn' },
      { w: 4, h: 5, x: 8, y: 0, i: 'ult' },
    ];

const _resourceLinks = getResources(_appConfig);

const useStyles = makeStyles(() => ({
  dragIndicator: {},
}));

export default function App() {
  const classes = useStyles();
  const [resourceLinks, setResourceLinks] = useState(_resourceLinks);
  const [resources, setResources] = useState([]);
  const [appConfig, setAppConfig] = useState(_appConfig);

  const memoResources = useMemo(() => getResources(appConfig), [appConfig]);

  useEffect(() => {
    setResourceLinks(memoResources);
  }, [memoResources]);

  const [referenceSelected, setReferenceSelected] = useState({
    bookId: 'tit',
    chapter: 1,
  });

  const layout = {
    absolute: appConfig,
  };

  function onLayoutChange(appConfig) {
    localStorage.setItem('appConfig', JSON.stringify(appConfig));
    setAppConfig(appConfig);
  }

  const onClose = (index) => {
    setAppConfig((prev) => prev.filter((el) => el.i !== index));
  };

  useEffect(() => {
    if (referenceSelected?.verse) {
      console.log(
        'Reference: ' + referenceSelected?.chapter + ':' + referenceSelected?.verse
      );
    }
  }, [referenceSelected?.chapter, referenceSelected?.verse]);

  return (
    <ResourcesContextProvider
      reference={referenceSelected}
      resourceLinks={resourceLinks}
      defaultResourceLinks={_resourceLinks}
      onResourceLinks={setResourceLinks}
      resources={resources}
      onResources={setResources}
      config={config}
    >
      <ReferenceSelectedContextProvider
        referenceSelected={referenceSelected}
        onReferenceSelected={setReferenceSelected}
      >
        <MenuBar />
        <SubMenuBar
          setAppConfig={setAppConfig}
          referenceSelected={referenceSelected}
          setReferenceSelected={setReferenceSelected}
        />
        <Workspace
          gridMargin={[15, 15]}
          rowHeight={30}
          totalGridUnits={12}
          classes={classes}
          layout={layout}
          onLayoutChange={onLayoutChange}
        >
          {appConfig.map((item) => (
            <Card
              key={item.i}
              onClose={() => onClose(item.i)}
              reference={referenceSelected}
              type={item.i}
            />
          ))}
        </Workspace>
      </ReferenceSelectedContextProvider>
      <TypoReport />
    </ResourcesContextProvider>
  );
}
