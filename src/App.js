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

const _reference = localStorage.getItem('reference')
  ? JSON.parse(localStorage.getItem('reference'))
  : {
      bookId: 'rut',
      chapter: 1,
      verse: 1,
    };

export default function App() {
  const { state, actions } = useContext(AppContext);
  const { appConfig } = state;
  const { setAppConfig } = actions;
  const classes = useStyles();
  const _resourceLinks = getResources(appConfig);
  const [resourceLinks, setResourceLinks] = useState(_resourceLinks);
  const [resources, setResources] = useState([]);
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
