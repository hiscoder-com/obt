import React, { useContext } from 'react';

import { Workspace } from 'resource-workspace-rcl';

import { AppContext } from './App.context';
import { SubMenuBar, Card } from './components';

import './styles/app.css';
import useStyles from './style';

export default function App() {
  const { state, actions } = useContext(AppContext);
  const { appConfig, referenceSelected } = state;
  const { setAppConfig } = actions;
  const classes = useStyles();
  const layout = {
    absolute: appConfig,
  };

  function onLayoutChange(newLayout) {
    localStorage.setItem('appConfig', JSON.stringify(newLayout));
    setAppConfig(newLayout);
  }

  const onClose = (index) => {
    setAppConfig((prev) => prev.filter((el) => el.i !== index));
  };

  return (
    <>
      <SubMenuBar />
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
    </>
  );
}
