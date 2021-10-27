import React, { useContext, useEffect, useMemo } from 'react';

import { useSnackbar } from 'notistack';
import { Workspace } from 'resource-workspace-rcl';

import { AppContext } from './context/AppContext';
import { ReferenceContext } from './context/ReferenceContext';
import {
  Shortcut,
  Swipes,
  Intro,
  Card,
  TypoReport,
  SubMenuBar,
  StartDialog,
} from './components';
import { Migrate } from './Migrate';
import { columns } from './config/base';
import { getLayoutType } from './helper';
import { useTranslation } from 'react-i18next';

import './styles/app.css';
import useStyles from './style';

//const Intro = React.lazy(() => import('./components/Intro/Intro'));
//const Card = React.lazy(() => import('./components/Card/Card'));
//const TypoReport = React.lazy(() => import('./components/TypoReport/TypoReport'));
//const SubMenuBar = React.lazy(() => import('./components/SubMenuBar/SubMenuBar'));

Migrate();
export default function App() {
  const {
    state: { appConfig, resourcesApp, resources, breakpoint },
    actions: { setAppConfig, setBreakpoint },
  } = useContext(AppContext);

  const { t } = useTranslation();
  const {
    state: {
      referenceSelected: { bookId },
    },
    actions: { applyBooksFilter },
  } = useContext(ReferenceContext);

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const layout = appConfig;
  const breakpoints = { lg: 900, md: 700, sm: 500 };

  Shortcut();
  Swipes();

  const onLayoutChange = (newLayout, _newLayout) => {
    const oldAppConfig = JSON.parse(localStorage.getItem('appConfig'));
    const type = getLayoutType(newLayout);
    const newAppConfig = {
      ...oldAppConfig,
      [type]: _newLayout,
    };
    localStorage.setItem('appConfig', JSON.stringify(newAppConfig));
    setAppConfig(newAppConfig[type]);
  };

  const mainResources = resourcesApp
    .filter((e) => appConfig.lg.map((e) => e.i).includes(e.name))
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
      setAppConfig((prev) => {
        const next = { ...prev };
        for (let k in next) {
          next[k] = next[k].filter((el) => el.i !== index);
        }

        return next;
      });
    } else {
      enqueueSnackbar(t('closeLastResource'), { variant: 'error' });
    }
  };

  const cards = (appConfig[breakpoint.name] ?? []).map((item) => (
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
    <>
      <StartDialog />
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
        columns={columns}
      >
        {cards}
      </Workspace>
    </>
  );
}
