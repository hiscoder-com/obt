import React, { useState, useEffect, useContext } from 'react';

import { Card, CardContent, useContent, useCardState } from 'translation-helps-rcl';
import { AppContext } from '../../context';
import ListWords from './ListWords';
import useListWordsBook from './useListWordsBook';

export default function SupportTWL(props) {
  const {
    state: { switchTypeUniqueWords },
  } = useContext(AppContext);
  const { title, classes, onClose, type, server, fontSize, reference, resource } = props;
  const { bookId, chapter, verse } = reference;
  const [selectedQuote, setQuote] = useState({});

  const [uniqueWordsItems, setUniqueWordsItems] = useState();
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
  // const { tsvs } = useContent({
  //   projectId: bookId,
  //   ref: resource.branch ?? 'master',
  //   languageId: resource.languageId ?? 'ru',
  //   resourceId: 'twl',
  //   owner: resource.owner ?? 'door43-catalog',
  //   server,
  // });
  const { listWordsBook, listWordsChapter } = useListWordsBook(tsvs, bookId);
  const equalVerse = (items) => {
    const uniqueWordsItems = [];
    const checkItems = [];
    items.forEach((item) => {
      if (!checkItems.includes(item.TWLink)) {
        uniqueWordsItems.push(item);
        checkItems.push(item.TWLink);
      }
    });
    return uniqueWordsItems;
  };

  const equalChapter = (items) => {
    const uniqueWordsItems = [];

    items.forEach((item) => {
      if (
        listWordsChapter[chapter] &&
        listWordsChapter[chapter][item.TWLink] &&
        listWordsChapter[chapter][item.TWLink][0] === chapter + ':' + verse
      ) {
        uniqueWordsItems.push(item);
      }
    });
    return uniqueWordsItems;
  };
  const equalBook = (items) => {
    const uniqueWordsItems = [];

    items.forEach((item) => {
      if (
        listWordsBook &&
        listWordsBook[item.TWLink] &&
        listWordsBook[item.TWLink][0] === chapter + ':' + verse
      ) {
        uniqueWordsItems.push(item);
      }
    });
    return uniqueWordsItems;
  };

  useEffect(() => {
    if (items) {
      switch (switchTypeUniqueWords) {
        case 'verse':
          setUniqueWordsItems(equalVerse(items));
          setItemIndex(0);
          break;
        case 'chapter':
          setUniqueWordsItems(equalChapter(equalVerse(items)));
          setItemIndex(0);
          break;
        case 'book':
          const words = equalBook(items);
          setUniqueWordsItems(words);
          setItemIndex(0);
          break;

        default:
          break;
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, switchTypeUniqueWords, listWordsChapter]);

  const {
    state: { item, headers, filters, itemIndex, markdownView },
    actions: { setFilters, setItemIndex, setMarkdownView },
  } = useCardState({
    items: switchTypeUniqueWords !== 'disabled' ? uniqueWordsItems : items,
    setQuote,
    selectedQuote,
    verse,
    chapter,
    projectId: bookId,
  });

  useEffect(() => {
    setItemIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference]);
  // console.log(items);
  return (
    <Card
      closeable
      title={title}
      onClose={() => onClose(type)}
      classes={classes}
      id={type}
      items={switchTypeUniqueWords !== 'disabled' ? uniqueWordsItems : items}
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
      <ListWords
        items={switchTypeUniqueWords !== 'disabled' ? uniqueWordsItems : items}
        itemIndex={itemIndex}
        listWordsBook={listWordsBook}
        bookId={reference.bookId}
      />
      <CardContent
        item={item}
        viewMode={'markdown'}
        filters={filters}
        fontSize={fontSize}
        markdown={markdown}
        isLoading={Boolean(loading)}
        languageId={languageId}
        markdownView={markdownView}
        selectedQuote={selectedQuote}
        setQuote={setQuote}
      />
    </Card>
  );
}
