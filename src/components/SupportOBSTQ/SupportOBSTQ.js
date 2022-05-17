import React, { useEffect, useState } from 'react';

import { Card, useContent, useCardState } from 'translation-helps-rcl';
import { SupportContent } from '../SupportContent';

export default function SupportOBSTQ({
  title,
  classes,
  onClose,
  type,
  server,
  fontSize,
  reference: { bookId, chapter, verse },
  resource,
}) {
  const [repoType, setRepoType] = useState('tsv');
  const mdConfig = {
    projectId: bookId,
    ref: resource.ref ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: 'obs-tq',
    filePath:
      String(chapter).padStart(2, '0') + '/' + String(verse).padStart(2, '0') + '.md',
    owner: resource.owner ?? 'door43-catalog',
    server,
  };
  const tsvConfig = {
    verse: String(verse),
    chapter: String(chapter),
    projectId: bookId,
    ref: resource.ref ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: 'obs-tq',
    owner: resource.owner ?? 'door43-catalog',
    server,
  };
  const {
    markdown,
    items,
    resource: { ...resourceData },
    resourceStatus,
  } = useContent(repoType === 'tsv' ? { ...tsvConfig } : { ...mdConfig });
  useEffect(() => {
    if (resourceData?.project?.path) {
      const path = resourceData.project.path;
      if (path.substring(path.length - 3) === 'tsv') {
        setRepoType('tsv');
      } else {
        setRepoType('md');
      }
    }
  }, [resourceData?.project?.path]);
  const {
    state: { item, headers, filters, itemIndex, markdownView },
    actions: { setFilters, setItemIndex, setMarkdownView },
  } = useCardState({
    items,
  });
  return (
    <Card
      closeable
      title={title}
      onClose={() => onClose(true)}
      classes={{ ...classes, children: 'tqcard' }}
      id={type}
      items={items}
      headers={headers}
      filters={filters}
      fontSize={fontSize}
      itemIndex={itemIndex}
      setFilters={setFilters}
      setItemIndex={setItemIndex}
      markdownView={markdownView}
      setMarkdownView={setMarkdownView}
      showSaveChangesPrompt={() => {
        return new Promise((resolve, reject) => {
          resolve();
        });
      }}
    >
      <SupportContent
        config={tsvConfig}
        item={item}
        resourceStatus={resourceStatus}
        fontSize={fontSize}
        markdown={markdown}
      />
    </Card>
  );
}
