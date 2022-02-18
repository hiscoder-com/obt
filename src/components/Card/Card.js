import React, { useContext } from 'react';

import { server } from '../../config/base';
import { AppContext, ReferenceContext } from '../../context';
import {
  Chapter,
  SupportTQ,
  SupportTN,
  SupportTWL,
  OBSVerses,
  SupportOBSTN,
  SupportOBSTQ,
  SupportOBSSQ,
  SupportOBSSN,
  SupportOBSTWL,
} from '../../components';
import { langNames } from '../../config/materials';

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
    if (el.owner + '__' + el.name === type) {
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

    case 'TSV Translation Questions':
    case 'Translation Questions':
      CurrentCard = SupportTQ;
      break;

    case 'TSV Translation Words Links':
      CurrentCard = SupportTWL;
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

    case 'OBS Study Questions':
      CurrentCard = SupportOBSSQ;
      break;

    case 'OBS Study Notes':
      CurrentCard = SupportOBSSN;
      break;

    case 'TSV OBS Translation Words Links':
      CurrentCard = SupportOBSTWL;
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
      title={
        resource.title +
        ' (' +
        langNames[resource.languageId].eng +
        '|' +
        resource.owner +
        ')'
      }
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
