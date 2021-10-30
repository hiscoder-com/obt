import React, { useContext } from 'react';

import { server } from '../../config/base';
import { AppContext, ReferenceContext } from '../../context';
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
  /**TODO
   *Move  all repeated code from Chapter,all Support* like const {*}=useContent({*}) to here
   */
  const {
    state: { resourcesApp, fontSize },
  } = useContext(AppContext);

  const {
    state: { referenceSelected },
  } = useContext(ReferenceContext);

  let resource = false;
  resourcesApp.forEach((el) => {
    if (el.name === type) {
      resource = el;
    }
  });

  if (!resource && resourcesApp.length > 0) {
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
      resource={resource}
      onClose={onClose}
      type={type}
      reference={referenceSelected}
      fontSize={fontSize}
      server={server}
    />
  );
}

export default Card;
