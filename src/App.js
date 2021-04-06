import React, { useContext, useState, useEffect } from 'react';

import {
  ResourcesContextProvider,
  ReferenceSelectedContextProvider,
} from 'scripture-resources-rcl';
import { Workspace } from 'test-bsa-workspace';

import { AppContext } from './App.context';
import { MenuBar, SubMenuBar, TypoReport, Card } from './components';

import { getResources } from './helper';

import './styles/app.css';
import useStyles from './style';

const config = { server: 'https://git.door43.org' };

const _appConfig = localStorage.getItem('appConfig')
  ? JSON.parse(localStorage.getItem('appConfig'))
  : [
      { w: 4, h: 5, x: 0, y: 0, i: 'rob' },
      { w: 4, h: 5, x: 4, y: 0, i: 'tn' },
      { w: 4, h: 5, x: 8, y: 0, i: 'ult' },
    ];

const _reference = localStorage.getItem('reference')
  ? JSON.parse(localStorage.getItem('reference'))
  : {
      bookId: 'rut',
      chapter: 1,
      verse: 1,
    };

const _resourceLinks = getResources(_appConfig);

export default function App() {
  const { state, actions } = useContext(AppContext);
  console.log(state, actions);
  const classes = useStyles();
  const [resourceLinks, setResourceLinks] = useState(_resourceLinks);
  const [resources, setResources] = useState([]);
  const [appConfig, setAppConfig] = useState(_appConfig);
  const [referenceSelected, setReferenceSelected] = useState(_reference);
  const [showBookSelect, setShowBookSelect] = useState(true);
  const [showChapterSelect, setShowChapterSelect] = useState(false);
  const layout = {
    absolute: appConfig,
  };

  useEffect(() => {
    setResourceLinks(getResources(appConfig));
  }, [appConfig]);

  useEffect(() => {
    localStorage.setItem('reference', JSON.stringify(referenceSelected));
  }, [referenceSelected]);

  function onLayoutChange(appConfig) {
    localStorage.setItem('appConfig', JSON.stringify(appConfig));
    setAppConfig(appConfig);
  }

  const onClose = (index) => {
    setAppConfig((prev) => prev.filter((el) => el.i !== index));
  };

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
          showBookSelect={showBookSelect}
          setShowBookSelect={setShowBookSelect}
          showChapterSelect={showChapterSelect}
          setShowChapterSelect={setShowChapterSelect}
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
              classes={classes}
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
