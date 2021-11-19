import React from 'react';
import { Card, CardContent, useContent, useCardState } from 'translation-helps-rcl';

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
    ref: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: 'obs-sn',
    verse,
    chapter,
    owner: resource.owner ?? 'door43-catalog',
    server,
  };
  const {
    items,
    resourceStatus: { loading },
    props: { languageId },
  } = useContent(config);

  const {
    state: { item, headers, itemIndex, markdownView },
    actions: { setFilters, setItemIndex, setMarkdownView },
  } = useCardState({
    items,
    verse,
    chapter,
    projectId: bookId,
    resourceId: 'sn',
  });
  const filterArray = ['Quote', 'Note'];

  return (
    <Card
      closeable
      title={title}
      onClose={() => onClose(type)}
      classes={{ ...classes, children: 'tqcard' }}
      id={type}
      items={items}
      headers={headers}
      filters={filterArray}
      fontSize={fontSize}
      itemIndex={itemIndex}
      setFilters={setFilters}
      setItemIndex={setItemIndex}
      markdownView={markdownView}
      setMarkdownView={setMarkdownView}
    >
      <CardContent
        item={item}
        filters={filterArray}
        fontSize={fontSize}
        viewMode="table"
        isLoading={Boolean(loading)}
        languageId={languageId}
        markdownView={markdownView}
      />
    </Card>
  );
}
