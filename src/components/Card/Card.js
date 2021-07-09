import React, { useContext } from 'react';

import { AppContext } from '../../App.context';
import {
  Chapter,
  SupportTQ,
  SupportTN,
  SupportTW,
  OBSVerses,
  SupportOBSTN,
  SupportOBSTQ,
} from '../../components';

function Card({ type, onClose, classes }) {
  let CurrentCard;

  const {
    state: { referenceSelected, resourcesApp, appConfig },
    actions: { setAppConfig },
  } = useContext(AppContext);

  let resource = false;
  resourcesApp.forEach((el) => {
    if (el.name === type) {
      resource = el;
    }
  });

  if (!resource) {
    const _appConfig = appConfig.filter((el) => el.i !== type);
    setAppConfig(_appConfig);
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
      CurrentCard = OBSVerses;
      break;

    case 'OBS Translation Questions':
      CurrentCard = SupportOBSTQ;
      break;

    case 'OBS Translation Notes':
      CurrentCard = SupportOBSTN;
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
