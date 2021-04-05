import React from 'react';

import Chapter from '../Chapter/Chapter';
import SupportTQ from '../SupportTQ/SupportTQ';
import SupportTN from '../SupportTN/SupportTN';

import { resourcesList } from '../../config';

import useStyles from './styled';

function Card({ type, onClose, reference }) {

  let CurrentCard;
  const resource = resourcesList[type];

  switch (resource.resourceId) {
    case 'tn':
      CurrentCard = SupportTN;
      break;

    case 'tq':
      CurrentCard = SupportTQ;
      break;

    default:
      CurrentCard = Chapter;
      break;
  }

  return (
    <CurrentCard
      classes={classes}
      title={resource.title}
      onClose={onClose}
      type={type}
      reference={reference}
    />
  );
}

export default Card;
