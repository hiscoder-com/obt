import React from 'react';

import Chapter from '../Chapter/Chapter';
import SupportTQ from '../SupportTQ/SupportTQ';
import SupportTN from '../SupportTN/SupportTN';

import { makeStyles } from '@material-ui/core/styles';

import { resourcesList } from '../../config';

const useStyles = makeStyles(() => ({
  root: {
    padding: '0 !important',
    margin: '0 1px !important',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  dragIndicator: {},
}));

function Card({ type, onClose, reference, onReference }) {
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

  const classes = useStyles();
  return (
    <CurrentCard
      title={resource.title}
      onClose={onClose}
      classes={classes}
      type={type}
      reference={reference}
      onReference={onReference}
    />
  );
}

export default Card;
