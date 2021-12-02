import React, { useState, useEffect } from 'react';

import { Card, CardContent, useContent, useCardState } from 'translation-helps-rcl';

import { useTranslation } from 'react-i18next';

import { FrontModal, ButtonGroupUI } from '../../components';

import { langNames } from '../../config/materials';
export default function SupportTN(props) {
  const { title, classes, onClose, type, server, fontSize, reference, resource } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedQuote, setQuote] = useState({});
  const [configFront, setConfigFront] = useState({});
  const { bookId, chapter, verse } = reference;
  const { t } = useTranslation();
  const config = {
    verse: String(verse),
    chapter: String(chapter),
    projectId: bookId,
    ref: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: 'tn',
    owner: resource.owner ?? 'door43-catalog',
    server,
  };

  const {
    markdown,
    items,
    resourceStatus: { loading },
    props: { languageId },
  } = useContent({
    ...config,
  });

  const onIntroClick = () => {
    setConfigFront({ ...config, verse: 'intro', chapter: 'front' });
    setOpenDialog(true);
  };
  const onNotesClick = () => {
    setConfigFront({ ...config, verse: 'intro' });
    setOpenDialog(true);
  };
  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  const {
    state: { item, headers, itemIndex, markdownView },
    actions: { setItemIndex, setMarkdownView },
  } = useCardState({
    items,
  });

  useEffect(() => {
    setItemIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference]);

  const filterArray = ['OrigQuote', 'GLQuote', 'OccurrenceNote'];

  return (
    <Card
      closeable
      title={title + ' (' + langNames[resource.languageId].eng + ')'}
      onClose={() => onClose(type)}
      classes={classes}
      id={type}
      items={items}
      fontSize={fontSize}
      headers={headers}
      filters={filterArray}
      itemIndex={itemIndex}
      setItemIndex={setItemIndex}
      markdownView={markdownView}
      setMarkdownView={setMarkdownView}
      showSaveChangesPrompt={() => {
        return new Promise((resolve, reject) => {
          resolve();
        });
      }}
    >
      {items && (
        <ButtonGroupUI
          style={{ marginTop: '5px' }}
          buttons={[
            { title: t('Introduction'), onClick: onIntroClick },
            { title: t('General_notes'), onClick: onNotesClick },
          ]}
        />
      )}

      {configFront.projectId && (
        <FrontModal
          onCloseDialog={onCloseDialog}
          open={openDialog}
          title={' '}
          config={configFront}
        />
      )}

      <CardContent
        item={item}
        viewMode="table"
        filters={filterArray}
        fontSize={fontSize}
        isLoading={Boolean(loading)}
        languageId={languageId}
        markdown={markdown}
        markdownView={markdownView}
        selectedQuote={selectedQuote}
        setQuote={setQuote}
      />
    </Card>
  );
}
