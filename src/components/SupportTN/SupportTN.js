import React, { useState, useContext, useEffect } from 'react';

import { Card, CardContent, useContent, useCardState } from 'translation-helps-rcl';

import { AppContext } from '../../App.context';
import { ReferenceContext } from '../../ReferenceContext';
import { server } from '../../config/base';

export default function SupportTN(props) {
  const { title, classes, onClose, type } = props;
  const {
    state: { resourcesApp, fontSize },
  } = useContext(AppContext);
  const [selectedQuote, setQuote] = useState({});

  const {
    state: { referenceSelected },
  } = useContext(ReferenceContext);

  const { bookId, chapter, verse } = referenceSelected;

  let resource = false;
  resourcesApp.forEach((el) => {
    if (el.name === type) {
      resource = el;
    }
  });

  const {
    markdown,
    items,
    isLoading,
    props: { languageId },
  } = useContent({
    verse: verse,
    chapter: chapter,
    projectId: bookId,
    branch: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: 'tn',
    owner: resource.owner ?? 'door43-catalog',
    server,
  });

  const {
    state: { item, headers, itemIndex, markdownView },
    actions: { setItemIndex, setMarkdownView },
  } = useCardState({
    items,
  });

  useEffect(() => {
    setItemIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [referenceSelected]);

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
