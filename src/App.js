import React, { useState, useEffect } from 'react';

import {
  ResourcesContextProvider,
  ReferenceSelectedContextProvider,
} from 'scripture-resources-rcl';

import { Workspace } from 'resource-workspace-rcl';
import { MenuBar, SubMenuBar, TypoReport, Card } from './components';

import { getResources } from './helper';

import './styles/app.css';

const config = { server: 'https://git.door43.org' };

const _appConfig = [
  { w: 4, h: 5, x: 0, y: 0, i: 'rob' },
  { w: 4, h: 5, x: 4, y: 0, i: 'tn' },
  { w: 4, h: 5, x: 8, y: 0, i: 'ult' },
];

const _resourceLinks = getResources(_appConfig);

export default function App() {
  const [resourceLinks, setResourceLinks] = useState(_resourceLinks);
  const [resources, setResources] = useState([]);
  const [appConfig, setAppConfig] = useState(_appConfig);

  useEffect(() => {
    setResourceLinks(getResources(appConfig));
  }, [appConfig]);

  const [referenceSelected, setReferenceSelected] = useState({
    bookId: 'tit',
    chapter: 1,
  });

  const layout = {
    absolute: appConfig,
  };

  function onLayoutChange(layout) {
    localStorage.setItem('layout', JSON.stringify(layout));
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
          appConfig={appConfig}
          setAppConfig={setAppConfig}
          referenceSelected={referenceSelected}
          setReferenceSelected={setReferenceSelected}
        />
        <Workspace
          gridMargin={[15, 15]}
          rowHeight={30}
          totalGridUnits={12}
          layout={layout}
          onLayoutChange={onLayoutChange}
        >
          {appConfig.map((item, index) => (
            <Card
              key={item.i}
              onClose={onClose}
              reference={referenceSelected}
              onReference={setReferenceSelected}
              type={item.i}
            />
          ))}
        </Workspace>
      </ReferenceSelectedContextProvider>
      <TypoReport />
    </ResourcesContextProvider>
  );
}
