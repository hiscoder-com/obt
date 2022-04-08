import React, { useContext, useMemo } from 'react';

import { Card as TranslationCard } from 'translation-helps-rcl';
import { useTranslation } from 'react-i18next';

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
  SupportTA,
} from '../../components';

import { server } from '../../config/base';
import { langNames } from '../../config/materials';

function Card({ type, onClose, classes }) {
  const { t } = useTranslation();
  let CurrentCard;
  const {
    state: { resourcesApp, fontSize, switchExtraTitleCard },
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

  const extraTitle = useMemo(
    () =>
      switchExtraTitleCard
        ? ' (' + langNames[resource.languageId]?.eng + '|' + resource.owner + ')'
        : '',
    [resource.languageId, resource.owner, switchExtraTitleCard]
  );

  if (!resource && resourcesApp.length > 0) {
    // Empty Card
    return (
      <TranslationCard
        closeable
        onClose={() => onClose(true)}
        classes={classes}
        id={type}
        fontSize={fontSize}
      >
        <h1>{t('Problem_loading')}</h1>
      </TranslationCard>
    );
  }

  switch (resource.subject) {
    case 'TSV Translation Notes':
      CurrentCard = SupportTN;
      break;
    case 'Translation Academy':
      CurrentCard = SupportTA;
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
    case 'TSV OBS Translation Questions':
      CurrentCard = SupportOBSTQ;
      break;

    case 'OBS Translation Notes':
    case 'TSV OBS Translation Notes':
      CurrentCard = SupportOBSTN;
      break;

    case 'OBS Study Questions':
    case 'TSV OBS Study Questions':
      CurrentCard = SupportOBSSQ;
      break;

    case 'OBS Study Notes':
    case 'TSV OBS Study Notes':
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
      title={resource.title + extraTitle}
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
