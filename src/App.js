import React, { useContext, useEffect, useState, useMemo } from 'react';

import { Workspace } from 'resource-workspace-rcl';
import { SnackbarProvider } from 'notistack';

import { AppContext } from './context/AppContext';
import { ReferenceContext } from './context/ReferenceContext';
import { SubMenuBar, Card, TypoReport, Shortcut } from './components';
import { useWindowSize } from './hooks';

import './styles/app.css';
import useStyles from './style';

export default function App() {
  const {
    state: { appConfig, referenceSelected, resourcesApp, resources },
    actions: { setAppConfig },
  } = useContext(AppContext);

  const {
    actions: { applyBooksFilter },
  } = useContext(ReferenceContext);

  const classes = useStyles();

  const layout = appConfig;

  const showOBS = appConfig.filter((el) => el.i.split('_')[1] === 'obs').length > 0;

  const [, height] = useWindowSize();
  const [rowHeight, setRowHeight] = useState(30);

  useEffect(() => {
    setRowHeight((height - 64) / 10 - 17);
  }, [height]);

  Shortcut();

  const onLayoutChange = (newLayout) => {
    localStorage.setItem('appConfig', JSON.stringify(newLayout));
    setAppConfig(newLayout);
  };

  const mainResources = resourcesApp
    .filter((e) => appConfig.map((e) => e.i).includes(e.name))
    .filter((e) =>
      [
        'Open Bible Stories',
        'Bible',
        'Aligned Bible',
        'Hebrew Old Testament',
        'Greek New Testament',
      ].includes(e.subject)
    );

  const compareMaterials = (resources, type) => {
    return (
      (resources.length >= 1 && !resources.map((e) => e.name).includes(type)) ||
      (resources.length > 1 && resources.map((e) => e.name).includes(type))
    );
  };

  const onClose = (index) => {
    if (compareMaterials(mainResources, index)) {
      setAppConfig((prev) => prev.filter((el) => el.i !== index));
    }
  };

  const cards = appConfig.map((item) => (
    <Card
      classes={classes}
      key={item.i}
      onClose={() => onClose(item.i)}
      reference={referenceSelected}
      type={item.i}
    />
  ));

  const availableBookList = useMemo(() => {
    const newBookList = [];
    if (showOBS) {
      newBookList.push('obs');
    } else {
      if (resources.length > 0) {
        resources.forEach((resource) => {
          resource.projects.forEach((project) => {
            if (!newBookList.includes(project.identifier)) {
              newBookList.push(project.identifier);
            }
          });
        });
      }
    }
    return newBookList;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resources.length, showOBS]);

  useEffect(() => {
    applyBooksFilter(availableBookList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableBookList]);
  const layoutWidths = [[1, 1], [1, 1], [1]];
  return (
    <SnackbarProvider maxSnack={3}>
      <SubMenuBar />
      <TypoReport />
      <Workspace
        gridMargin={[15, 15]}
        rowHeight={rowHeight}
        totalGridUnits={12}
        classes={classes}
        layout={layout}
        onLayoutChange={onLayoutChange}
        layoutWidths={layoutWidths}
      >
        {cards}
      </Workspace>
    </SnackbarProvider>
  );
}
