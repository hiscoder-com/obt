import React, { useState } from 'react';

import { Card, CardContent, useContent, useCardState } from 'translation-helps-rcl';
import { ReferenceSelectedContext } from 'scripture-resources-rcl';

import { resourcesList, server } from '../../config';

export default function SupportTW(props) {
  const { title, classes, onClose, type } = props;
  const { state: reference } = React.useContext(ReferenceSelectedContext);

  const [selectedQuote, setQuote] = useState({});
  const {
    markdown,
    items,
    isLoading,
    props: { languageId },
  } = useContent({
    verse: reference.verse,
    chapter: reference.chapter,
    projectId: reference.bookId,
    branch: resourcesList[type].branch ?? 'master',
    languageId: resourcesList[type].languageId ?? 'ru',
    resourceId: resourcesList[type].resourceId ?? 'tw',
    owner: resourcesList[type].owner ?? 'bsa',
    server,
  });

  const {
    state: { item, headers, filters, fontSize, itemIndex, markdownView },
    actions: { setFilters, setFontSize, setItemIndex, setMarkdownView },
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
      setFontSize={setFontSize}
      setItemIndex={setItemIndex}
      markdownView={markdownView}
      setMarkdownView={setMarkdownView}
    >
      <CardContent
        item={item}
        //        viewMode="table"
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
