import React, { useContext, useEffect, useMemo } from 'react';

import { SnackbarProvider } from 'notistack';
import { Workspace } from '@texttree/resource-workspace-rcl';

import { AppContext } from './context/AppContext';
import { ReferenceContext } from './context/ReferenceContext';
import { Shortcut, Swipes, Intro, Card, TypoReport, SubMenuBar } from './components';

import './styles/app.css';
import useStyles from './style';

//const Intro = React.lazy(() => import('./components/Intro/Intro'));
//const Card = React.lazy(() => import('./components/Card/Card'));
//const TypoReport = React.lazy(() => import('./components/TypoReport/TypoReport'));
//const SubMenuBar = React.lazy(() => import('./components/SubMenuBar/SubMenuBar'));

export default function App() {
  const {
    state: { appConfig, resourcesApp, resources },
    actions: { setAppConfig, setBreakpoint },
  } = useContext(AppContext);

  const {
    state: {
      referenceSelected: { bookId },
    },
    actions: { applyBooksFilter },
  } = useContext(ReferenceContext);

  const classes = useStyles();
  const layout = {
    lg: appConfig,
  };
  const breakpoints = { lg: 900, md: 700, sm: 500 };

  Shortcut();
  Swipes();
  const onLayoutChange = (newLayout, _newLayout) => {
    const oldAppConfig = JSON.parse(localStorage.getItem('appConfig'));
    let type = 'bible';
    newLayout.forEach((el) => {
      if (el.i.split('_')[1].split('-')[0] === 'obs') {
        type = 'obs';
      }
    });
    const newAppConfig = {
      ...oldAppConfig,
      [type]: newLayout,
    };
    localStorage.setItem('appConfig', JSON.stringify(newAppConfig));
    setAppConfig(_newLayout['lg']); //TODO - в такой конфигурации в локалсторедж сохрaняется только
    //значения ключа 'lg'. на десктопе - норм, на телефоне - не катит, высота скачет.
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
    <Card key={item.i} classes={classes} onClose={() => onClose(item.i)} type={item.i} />
  ));

  const availableBookList = useMemo(() => {
    const newBookList = [];
    if (bookId === 'obs') {
      newBookList.push('obs');
    } else {
      if (resources.length > 0) {
        resources.forEach((resource) => {
          if (resource.projects) {
            resource.projects.forEach((project) => {
              if (!newBookList.includes(project.identifier)) {
                newBookList.push(project.identifier);
              }
            });
          }
        });
      }
    }
    return newBookList;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resources.length, bookId]);

  useEffect(() => {
    applyBooksFilter(availableBookList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableBookList]);

  const onBreakpointChange = (name, cols) => {
    setBreakpoint({ name, cols });
  };

  return (
    <SnackbarProvider maxSnack={3}>
      <Intro />
      <SubMenuBar />
      <TypoReport />
      <Workspace
        gridMargin={[15, 15]}
        autoResize={true}
        totalGridUnits={12}
        classes={classes}
        layout={layout}
        breakpoints={breakpoints}
        rows={12}
        correctHeight={64}
        onBreakpointChange={onBreakpointChange}
        onLayoutChange={onLayoutChange}
        columns={{
          lg: 12,
          md: 6,
          sm: 2,
          xs: 2,
          xxs: 2,
        }}
      >
        {cards}
      </Workspace>
    </SnackbarProvider>
  );
}
