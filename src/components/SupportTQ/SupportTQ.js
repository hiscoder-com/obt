import React, { useContext } from 'react';

import { Card, CardContent, useContent, useCardState } from 'translation-helps-rcl';

import { AppContext } from '../../App.context';
import { resourcesList, server } from '../../config';

export default function SupportTQ(props) {
  const { title, classes, onClose, type } = props;
  const appContext = useContext(AppContext);
  const { referenceSelected } = appContext.state;

  const {
    markdown,
    items,
    isLoading,
    props: { languageId },
  } = useContent({
    verse: referenceSelected.verse,
    chapter: referenceSelected.chapter,
    projectId: referenceSelected.bookId,
    branch: resourcesList[type].branch ?? 'master',
    languageId: resourcesList[type].languageId ?? 'ru',
    resourceId: resourcesList[type].resourceId ?? 'tq',
    filePath:
      String(referenceSelected.chapter).padStart(2, '0') +
      '/' +
      String(referenceSelected.verse).padStart(2, '0') +
      '.md',
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
        filters={filters}
        fontSize={fontSize}
        markdown={markdown}
        viewMode="question"
        isLoading={isLoading}
        languageId={languageId}
        markdownView={markdownView}
      />
    </Card>
  );
}
