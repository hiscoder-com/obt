import React, { useState, useEffect } from 'react';

import { Card, CardContent, useContent, useCardState } from 'translation-helps-rcl';

export default function SupportTN(props) {
  const { title, classes, onClose, type, resource, reference, fontSize, server } = props;

  const [selectedQuote, setQuote] = useState({});
  const { bookId, chapter, verse } = reference;

  const {
    markdown,
    items,
    resourceStatus,
    props: { languageId },
  } = useContent({
    verse: String(verse),
    chapter: String(chapter),
    projectId: bookId,
    ref: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: 'tn',
    owner: resource.owner ?? 'door43-catalog',
    server,
  });
  const isLoading = resourceStatus.loading;
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
      title={title}
      onClose={() => onClose(type)}
      classes={classes}
      items={items}
      fontSize={fontSize}
      headers={headers}
      filters={filterArray}
      itemIndex={itemIndex}
      setItemIndex={setItemIndex}
      markdownView={markdownView}
      setMarkdownView={setMarkdownView}
    >
      <CardContent
        item={item}
        viewMode="table"
        filters={filterArray}
        markdown={markdown}
        fontSize={fontSize}
        isLoading={isLoading}
        languageId={languageId}
        markdownView={markdownView}
        selectedQuote={selectedQuote}
        setQuote={setQuote}
      />
    </Card>
  );
}
