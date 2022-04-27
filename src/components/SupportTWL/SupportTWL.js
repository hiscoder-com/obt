import React, { useState, useEffect, useContext } from 'react';

import { Card, CardContent, useContent, useCardState } from 'translation-helps-rcl';

import { AppContext } from '../../context';

import { ListWords } from '.';
import useListWordsReference from './useListWordsReference';
import useDeepCompareEffect from 'use-deep-compare-effect';

export default function SupportTWL(props) {
  const {
    state: { switchTypeUniqueWords },
  } = useContext(AppContext);
  const { title, classes, onClose, type, server, fontSize, reference, resource } = props;
  const { bookId, chapter, verse } = reference;

  const [uniqueWordsItems, setUniqueWordsItems] = useState([]);
  const {
    markdown,
    items,
    tsvs,
    resourceStatus: { loading },
    props: { languageId },
  } = useContent({
    verse,
    chapter,
    projectId: bookId,
    ref: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: 'twl',
    owner: resource.owner ?? 'door43-catalog',
    server,
  });

  const { listWordsReference, listWordsChapter } = useListWordsReference(tsvs, bookId);

  useDeepCompareEffect(() => {
    if (!items) {
      return;
    }
    if (switchTypeUniqueWords === 'disabled') {
      setUniqueWordsItems(items);
      return;
    }

    const wordsItems = [];
    const checkItemsVerse = [];
    items.forEach((item) => {
      if (!checkItemsVerse.includes(item.TWLink)) {
        wordsItems.push(item);
        checkItemsVerse.push(item.TWLink);
      }
    });
    if (switchTypeUniqueWords === 'verse') {
      setUniqueWordsItems(wordsItems);
      return;
    }
    const otherWordsItems = [];
    wordsItems.forEach((item) => {
      if (
        (switchTypeUniqueWords === 'chapter' &&
          listWordsChapter &&
          listWordsChapter[chapter][item?.TWLink] === verse) ||
        (switchTypeUniqueWords === 'book' &&
          listWordsReference &&
          item?.TWLink &&
          listWordsReference[item?.TWLink] &&
          listWordsReference[item?.TWLink][0] === chapter + ':' + verse)
      ) {
        otherWordsItems.push(item);
      }
    });
    setUniqueWordsItems(otherWordsItems);
  }, [switchTypeUniqueWords, { items }, listWordsReference]);

  const {
    state: { item, headers, filters, itemIndex, markdownView },
    actions: { setFilters, setItemIndex, setMarkdownView },
  } = useCardState({
    items: uniqueWordsItems,
    verse,
    chapter,
    projectId: bookId,
  });

  useEffect(() => {
    setItemIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference]);

  return (
    <Card
      closeable
      title={title}
      onClose={() => onClose(type)}
      classes={classes}
      id={type}
      items={uniqueWordsItems}
      headers={headers}
      filters={filters}
      fontSize={fontSize}
      itemIndex={itemIndex}
      setFilters={setFilters}
      setItemIndex={setItemIndex}
      markdownView={markdownView}
      setMarkdownView={setMarkdownView}
      showSaveChangesPrompt={() => {
        return new Promise((resolve, reject) => {
          resolve();
        });
      }}
    >
      {uniqueWordsItems.length > 0 && (
        <ListWords
          items={uniqueWordsItems}
          links={
            uniqueWordsItems &&
            listWordsReference &&
            listWordsReference[uniqueWordsItems[itemIndex]?.TWLink]
          }
        />
      )}
      {/* <div style={{ color: '#9C9C9C' }}> */}
      <CardContent
        item={item}
        viewMode={'markdown'}
        filters={filters}
        fontSize={fontSize}
        markdown={markdown}
        isLoading={Boolean(loading)}
        languageId={languageId}
        markdownView={markdownView}
      />
      {/* </div> */}
    </Card>
  );
}
