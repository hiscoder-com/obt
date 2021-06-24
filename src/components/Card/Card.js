import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';

import { AppContext } from '../../App.context';
import Chapter from '../Chapter/Chapter';
import SupportTQ from '../SupportTQ/SupportTQ';
import SupportTN from '../SupportTN/SupportTN';
import SupportTW from '../SupportTW/SupportTW';

import { resourcesList } from '../../config';

function Card({ type, onClose, classes }) {
  let CurrentCard;

  const { state } = useContext(AppContext);
  const { referenceSelected } = state;

  const { t } = useTranslation();
  const resource = resourcesList[type];

  if (!resource) {
    return false;
  }

  switch (resource.resourceId) {
    case 'tn':
      CurrentCard = SupportTN;
      break;

    case 'tq':
      CurrentCard = SupportTQ;
      break;

    case 'tw':
      CurrentCard = SupportTW;
      break;

    default:
      CurrentCard = Chapter;
      break;
  }

  return (
    <CurrentCard
      classes={classes}
      title={t(resource.resourceId)}
      onClose={onClose}
      type={type}
      reference={referenceSelected}
    />
  );
}

export default Card;
