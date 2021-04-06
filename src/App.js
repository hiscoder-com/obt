import React, { useContext, useState, useEffect } from 'react';

import {
  ResourcesContextProvider,
  ReferenceSelectedContextProvider,
} from 'scripture-resources-rcl';
import { Workspace } from 'test-bsa-workspace';

import { AppContext } from './App.context';
import { MenuBar, SubMenuBar, TypoReport, Card } from './components';

import './styles/app.css';
import useStyles from './style';

const config = { server: 'https://git.door43.org' };

export default function App() {
  const { state, actions } = useContext(AppContext);
  const {
    appConfig,
    referenceSelected,
    resourceLinks,
    resources,
    _resourceLinks,
  } = state;
  const { setAppConfig, setReferenceSelected, setResourceLinks, setResources } = actions;
  const classes = useStyles();
  const [showBookSelect, setShowBookSelect] = useState(true);
  const [showChapterSelect, setShowChapterSelect] = useState(false);
  const layout = {
    absolute: appConfig,
  };

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
