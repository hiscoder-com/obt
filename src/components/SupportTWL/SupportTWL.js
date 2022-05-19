import React, { useState, useEffect, useContext } from 'react';

import useDeepCompareEffect from 'use-deep-compare-effect';
import { Box } from '@material-ui/core';
import { Card, useContent, useCardState } from 'translation-helps-rcl';

import { AppContext } from '../../context';
import { SupportContent } from '../../components';
import { ListWords } from '.';

import useListWordsReference from './useListWordsReference';

import useStyles from './style';

export default function SupportTWL(props) {
  const {
    state: { switchTypeUniqueWords, switchHideRepeatedWords },
  } = useContext(AppContext);

  const { title, classes, onClose, type, server, fontSize, reference, resource } = props;
  const { bookId, chapter, verse } = reference;
  const classesLocal = useStyles();
  const [uniqueWordsItems, setUniqueWordsItems] = useState([]);
  const [changeColor, setChangeColor] = useState();
  const config = {
    verse,
    chapter,
    projectId: bookId,
    ref: resource.ref ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: 'twl',
    owner: resource.owner ?? 'door43-catalog',
    server,
    httpConfig: { noCache: true },
  };
  const { items, tsvs, resourceStatus } = useContent({
    ...config,
  });

  const { listWordsReference, listWordsChapter } = useListWordsReference(tsvs, bookId);

  useDeepCompareEffect(() => {
    if (!items || items.length === 0) {
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
          item?.TWLink &&
          listWordsChapter[chapter] &&
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
    items: !switchHideRepeatedWords ? items : uniqueWordsItems,
    verse,
    chapter,
    projectId: bookId,
  });

  useEffect(() => {
    setItemIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId, chapter, verse, switchHideRepeatedWords, switchTypeUniqueWords]);

  useEffect(() => {
    const _changeColor =
      !switchHideRepeatedWords &&
      uniqueWordsItems &&
      items &&
      items.length > 0 &&
      (itemIndex !== undefined || null) &&
      !uniqueWordsItems.includes(items[itemIndex]);
    setChangeColor(_changeColor);
  }, [itemIndex, items, uniqueWordsItems, switchHideRepeatedWords]);

  return (
    <Card
      closeable
      title={title}
      onClose={() => onClose(true)}
      classes={classes}
      id={type}
      items={!switchHideRepeatedWords ? items : uniqueWordsItems}
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
      {(!switchHideRepeatedWords || uniqueWordsItems.length > 0) && (
        <ListWords
          links={
            !switchHideRepeatedWords
              ? items &&
                items.length > 0 &&
                listWordsReference &&
                listWordsReference[items[itemIndex]?.TWLink]
              : uniqueWordsItems &&
                uniqueWordsItems.length > 0 &&
                listWordsReference &&
                listWordsReference[uniqueWordsItems[itemIndex]?.TWLink]
          }
        />
      )}
      <Box className={changeColor ? classesLocal.twl : ''}>
        <SupportContent
          config={config}
          item={item}
          resourceStatus={resourceStatus}
          fontSize={fontSize}
        />
      </Box>
    </Card>
  );
}
