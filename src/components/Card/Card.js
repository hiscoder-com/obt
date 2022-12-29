import React, { useContext, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Card as TranslationCard, useContent } from 'translation-helps-rcl';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

import { DialogUI } from '../DialogUI';

import {
  SupportOBSTWL,
  SupportOBSSN,
  SupportOBSSQ,
  SupportOBSTN,
  SupportOBSTQ,
  SupportTWL,
  OBSVerses,
  SupportTA,
  SupportTN,
  SupportTQ,
  Chapter,
} from '../../components';
import { AppContext, ReferenceContext } from '../../context';

import { server } from '../../config/base';
import { langNames } from '../../config/materials';

function Card({ type, onClose, classes, disableSettingsButton }) {
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

  const [license, setLicense] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const { bookId, chapter } = referenceSelected;

  const content = useContent({
    resourceId: resource.name.split('_')[1],
    languageId: resource.languageId,
    owner: resource.owner,
    projectId: bookId,
    ref: resource.ref,
    chapter: chapter,
    server,
  });

  const extraTitle = useMemo(
    () =>
      switchExtraTitleCard
        ? ' (' + langNames?.[resource.languageId]?.eng + '|' + resource.owner + ')'
        : '',
    [resource.languageId, resource.owner, switchExtraTitleCard]
  );

  if (!resource && resourcesApp.length > 0) {
    // Empty Card
    return (
      <TranslationCard
        disableSettingsButton={disableSettingsButton}
        onClose={() => onClose(true)}
        fontSize={fontSize}
        classes={classes}
        id={type}
        closeable
      >
        <h1>{t('Problem_loading')}</h1>
      </TranslationCard>
    );
  }

  const getLicense = () => {
    const {
      resource: { username, repository, config, tag },
    } = content;
    try {
      axios
        .get(`${config?.server}/${username}/${repository}/raw/branch/${tag}/LICENSE.md`)
        .then((res) => setLicense(res.data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

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
    <>
      <CurrentCard
        disableSettingsButton={disableSettingsButton}
        title={resource.title + extraTitle}
        reference={referenceSelected}
        resource={resource}
        fontSize={fontSize}
        classes={classes}
        onClose={onClose}
        server={server}
        type={type}
        onLicense={() => {
          setOpenModal(true);
          getLicense();
        }}
      />
      <DialogUI
        onClose={() => setOpenModal(false)}
        title={`License`}
        open={openModal}
        maxWidth={'sm'}
      >
        <ReactMarkdown className={'md'}>{license}</ReactMarkdown>
      </DialogUI>
    </>
  );
}

export default Card;
