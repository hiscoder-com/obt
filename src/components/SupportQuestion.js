import React from 'react';
import { Card, CardContent, useContent, useCardState } from 'translation-helps-rcl';
import { ReferenceSelectedContext } from 'scripture-resources-rcl';

export default function SupportQuestion(props) {
  const { title, classes, onClose, index } = props;
  const { state: reference } = React.useContext(ReferenceSelectedContext);

  const {
    markdown,
    items,
    isLoading,
    props: { languageId },
  } = useContent({
    verse: reference.verse,
    chapter: reference.chapter,
    projectId: reference.bookId,
    branch: 'master',
    languageId: 'ru',
    resourceId: 'tq',
    filePath:
      String(reference.chapter).padStart(2, '0') + '/' + String(reference.verse).padStart(2, '0') + '.md',
    owner: 'bsa',
    server: 'https://git.door43.org',
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
      onClose={() => onClose(index)}
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
