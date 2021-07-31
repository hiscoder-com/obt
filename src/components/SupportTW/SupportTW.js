import React, { useState, useContext } from 'react';

import { Card, CardContent, useContent, useCardState } from 'translation-helps-rcl';

import { AppContext } from '../../App.context';
import { ReferenceContext } from '../../ReferenceContext';
import { server } from '../../config/base';

export default function SupportTW(props) {
  const { title, classes, onClose, type } = props;
  const {
    state: { resourcesApp, fontSize },
  } = useContext(AppContext);

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

  const [selectedQuote, setQuote] = useState({});
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
    resourceId: 'tw',
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
      classes={classes}
      items={items}
      headers={headers}
      filters={filters}
      fontSize={fontSize}
      itemIndex={itemIndex}
      setFilters={setFilters}
      setItemIndex={setItemIndex}
      markdownView={markdownView}
      setMarkdownView={setMarkdownView}
    >
      <CardContent
        item={item}
        viewMode={'markdown'}
        filters={filters}
        fontSize={fontSize}
        markdown={markdown}
        isLoading={isLoading}
        languageId={languageId}
        markdownView={markdownView}
        selectedQuote={selectedQuote}
        setQuote={setQuote}
      />
    </Card>
  );
}
