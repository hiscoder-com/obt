import React from 'react';
import { Card, CardContent, useContent, useCardState } from 'translation-helps-rcl';

export default function SupportOBSTQ(props) {
  const { title, classes, onClose, type, server, fontSize, reference, resource } = props;
  const { bookId, chapter, verse } = reference;
  const {
    markdown,
    items,
    resourceStatus: { loading },
    props: { languageId },
  } = useContent({
    projectId: bookId,
    ref: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: 'obs-tq',
    filePath:
      String(chapter).padStart(2, '0') + '/' + String(verse).padStart(2, '0') + '.md',
    owner: resource.owner ?? 'door43-catalog',
    server,
  });
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
      onClose={() => onClose(type)}
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
      <CardContent
        item={item}
        filters={filters}
        fontSize={fontSize}
        markdown={markdown}
        viewMode="question"
        isLoading={Boolean(loading)}
        languageId={languageId}
        markdownView={markdownView}
      />
    </Card>
  );
}
