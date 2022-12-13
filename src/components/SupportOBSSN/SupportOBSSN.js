import React from 'react';

import { Card, useContent, useCardState } from 'translation-helps-rcl';

import { SupportContent } from '../SupportContent';

export default function SupportOBSSN({
  title,
  classes,
  onClose,
  type,
  server,
  fontSize,
  reference: { bookId, chapter, verse },
  resource,
}) {
  const config = {
    projectId: bookId,
    ref: resource.ref ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: 'obs-sn',
    verse,
    chapter,
    owner: resource.owner ?? 'door43-catalog',
    server,
  };
  const { items, resourceStatus, markdown } = useContent(config);

  const {
    state: { item, headers, itemIndex },
    actions: { setFilters, setItemIndex },
  } = useCardState({
    items,
    verse,
    chapter,
    projectId: bookId,
    resourceId: 'sn',
  });
  return (
    <Card
      closeable
      disableSettingsButton
      title={title}
      onClose={() => onClose(true)}
      classes={{ ...classes, children: 'tqcard' }}
      id={type}
      items={items}
      headers={headers}
      itemIndex={itemIndex}
      setFilters={setFilters}
      setItemIndex={setItemIndex}
      showSaveChangesPrompt={() => {
        return new Promise((resolve, reject) => {
          resolve();
        });
      }}
    >
      <SupportContent
        config={config}
        item={item}
        resourceStatus={resourceStatus}
        fontSize={fontSize}
        markdown={markdown}
      />
    </Card>
  );
}
