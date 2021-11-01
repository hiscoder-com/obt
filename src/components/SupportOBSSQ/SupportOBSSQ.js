import React from 'react';
import { Card, CardContent, useContent, useCardState } from 'translation-helps-rcl';

export default function SupportOBSSQ(props) {
  const { title, classes, onClose, type, server, fontSize, reference, resource } = props;
  const { bookId, chapter, verse } = reference;
  const {
    tsvs,
    items,
    resourceStatus,
    props: { languageId },
  } = useContent({
    projectId: bookId,
    ref: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: 'obs-sq',
    verse,
    chapter,
    owner: resource.owner ?? 'door43-catalog',
    server,
  });

  const {
    state: { item, headers, filters, itemIndex },
    actions: { setFilters, setItemIndex },
  } = useCardState({
    items,
    verse,
    chapter,
    projectId: bookId,
    resourceId: 'obs-sq',
  });

  React.useEffect(() => {
    setItemIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference]);
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
    >
      <CardContent
        item={item}
        filters={filters}
        fontSize={fontSize}
        viewMode="question"
        isLoading={Boolean(resourceStatus.loading)}
        languageId={languageId}
      />
    </Card>
  );
}
