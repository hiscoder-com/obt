import React, { useState, useContext } from 'react';

import { Card, CardContent, useContent, useCardState } from 'translation-helps-rcl';

import { AppContext } from '../../App.context';
import { server } from '../../config';

export default function SupportTN(props) {
  const { title, classes, onClose, type } = props;
  const {
    state: { referenceSelected, resourcesApp, fontSize },
  } = useContext(AppContext);
  const [selectedQuote, setQuote] = useState({});

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
    verse: referenceSelected.verse,
    chapter: referenceSelected.chapter,
    projectId: referenceSelected.bookId,
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
