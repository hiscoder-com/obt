import React, { useContext, useEffect, useMemo } from 'react';

import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { Workspace } from 'resource-workspace-rcl';
import { useProjector } from '@texttree/projector-mode-rcl';

import { AppContext, ReferenceContext } from './context';
import { Card, CardSettings } from './components';

import { columns } from './config/base';
import { getLayoutType } from './helper';

import useStyles from './style';

const breakpoints = { lg: 900, md: 700, sm: 500 };

export default function WorkSpaceWrap() {
  const {
    state: { appConfig, resourcesApp, resources, breakpoint },
    actions: { setAppConfig, setBreakpoint },
  } = useContext(AppContext);
  const { setData } = useProjector();

  const { t } = useTranslation();
  const {
    state: {
      referenceSelected: { bookId },
    },
    actions: { applyBooksFilter },
  } = useContext(ReferenceContext);

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const layout = useMemo(() => ({ ...appConfig }), [appConfig]);

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
    .filter((e) => appConfig.lg.map((e) => e.i).includes(e.owner + '__' + e.name))
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
      (resources.length >= 1 &&
        !resources.map((e) => e.owner + '__' + e.name).includes(type)) ||
      (resources.length > 1 &&
        resources.map((e) => e.owner + '__' + e.name).includes(type))
    );
  };

  const onClose = (index, force = false) => {
    if (force || compareMaterials(mainResources, index)) {
      setAppConfig((prev) => {
        const next = { ...prev };
        for (let k in next) {
          next[k] = next[k].filter((el) => el.i !== index);
        }

        return next;
      });
    } else {
      enqueueSnackbar(t('Close_last_resource'), { variant: 'warning' });
    }
  };

  const cards = (appConfig[breakpoint.name] ?? []).map((item) =>
    item.i === 'projector' ? (
      <CardSettings key={item.i} classes={classes} />
    ) : (
      <Card
        key={item.i}
        classes={classes}
        onClose={(event, force = false) => onClose(item.i, force)}
        type={item.i}
      />
    )
  );

  const availableBookList = useMemo(() => {
    const newBookList = [];
    setData('isObs', bookId === 'obs');
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
