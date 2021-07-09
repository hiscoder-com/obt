import React, { useContext } from 'react';

import { Card, CardContent, useContent, useCardState } from 'translation-helps-rcl';

import { AppContext } from '../../App.context';
import { server } from '../../config/base';

export default function SupportOBSTN(props) {
  const { title, classes, onClose, type } = props;
  const {
    state: { referenceSelected, fontSize, resourcesApp },
  } = useContext(AppContext);

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
    projectId: referenceSelected.bookId + '-tn',
    branch: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: 'obs-tn',
    filePath:
      String(referenceSelected.chapter).padStart(2, '0') +
      '/' +
      String(referenceSelected.verse).padStart(2, '0') +
      '.md',
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
      classes={{ ...classes, children: 'tqcard' }}
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
