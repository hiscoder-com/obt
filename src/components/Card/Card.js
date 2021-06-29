import React, { useContext } from 'react';

import { AppContext } from '../../App.context';
import Chapter from '../Chapter/Chapter';
import SupportTQ from '../SupportTQ/SupportTQ';
import SupportTN from '../SupportTN/SupportTN';
import SupportTW from '../SupportTW/SupportTW';
import OBS from '../OBS/OBS';

function Card({ type, onClose, classes }) {
  let CurrentCard;

  const {
    state: { referenceSelected, resourcesApp },
  } = useContext(AppContext);

  let resource = false;
  resourcesApp.forEach((el) => {
    if (el.name === type) {
      resource = el;
    }
  });

  if (!resource) {
    return false;
  }

  switch (resource.subject) {
    case 'TSV Translation Notes':
      CurrentCard = SupportTN;
      break;

    case 'Translation Questions':
      CurrentCard = SupportTQ;
      break;

    case 'Translation Words':
      CurrentCard = SupportTW;
      break;

    case 'Open Bible Stories':
      CurrentCard = OBS;
      break;

    case 'Bible':
    case 'Aligned Bible':
    case 'Hebrew Old Testament':
    case 'Greek New Testament':
      CurrentCard = Chapter;
      break;

    default:
      return false;
  }

  return (
    <CurrentCard
      classes={classes}
      title={resource.title}
      onClose={onClose}
      type={type}
      reference={referenceSelected}
    />
  );
}

export default Card;
