import React from 'react';
import { Card, CardContent, useContent, useCardState } from 'translation-helps-rcl';

export default function SupportOBSSN(props) {
  const { title, classes, onClose, type, server, fontSize, reference, resource } = props;
  const { bookId, chapter, verse } = reference;

  const {
    items,
    resourceStatus: { loading },
    props: { languageId },
  } = useContent({
    projectId: bookId,
    ref: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: 'obs-sn',
    verse,
    chapter,
    owner: resource.owner ?? 'door43-catalog',
    server,
  });

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
    >
      <CardContent
        item={item}
        filters={filterArray}
        fontSize={fontSize}
        viewMode="table"
        isLoading={Boolean(loading)}
        languageId={languageId}
      />
    </Card>
  );
}
