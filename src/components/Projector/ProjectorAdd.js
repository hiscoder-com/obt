import React, { useContext } from 'react';

import { ListItemIcon, MenuItem } from '@material-ui/core';
import { getXY } from 'resource-workspace-rcl';
import { useTranslation } from 'react-i18next';

import { AppContext } from '../../context';

import { defaultCard, columns } from '../../config/base';

import CastConnectedIcon from '@material-ui/icons/CastConnected';

function ProjectorAdd({ handleCloseMainMenu }) {
  const { t } = useTranslation();
  const {
    state: { appConfig },
    actions: { setAppConfig },
  } = useContext(AppContext);
  const handleAddCard = () => {
    handleCloseMainMenu();
    setAppConfig((prev) => {
      const next = { ...prev };
      for (let k in next) {
        const pos = getXY(appConfig[k], columns[k], defaultCard[k].h, defaultCard[k].w);
        next[k] = next[k].concat({
          ...defaultCard[k],
          h: 5,
          x: pos.x,
          y: pos.y,
          i: 'projector',
        });
      }
      return next;
    });
    setTimeout(function () {
      document.querySelector('#projector_title').scrollIntoView();
    }, 1000);
  };
  return (
    <MenuItem onClick={handleAddCard} divider={true}>
      <ListItemIcon>
        <CastConnectedIcon fontSize="small" />
      </ListItemIcon>
      {t('Projector_add')}
    </MenuItem>
  );
}

export default ProjectorAdd;
