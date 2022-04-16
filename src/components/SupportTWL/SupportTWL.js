import React, { useState, useEffect, useContext } from 'react';

import { Card, CardContent, useContent, useCardState } from 'translation-helps-rcl';
import { AppContext } from '../../context';
import ListWords from './ListWords';
import useListWordsBook from './useListWordsBook';

export default function SupportTWL(props) {
  const {
    state: { switchUniqueWords },
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
  const { listWordsBook, listWordsChapter } = useListWordsBook(tsvs, bookId);
  const switchUniqueChapter = true;
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
      if (listWordsChapter[chapter][item.TWLink][0] === chapter + ':' + verse) {
        uniqueWordsItems.push(item);
      }
    });
    return uniqueWordsItems;
  };

  useEffect(() => {
    if (items && switchUniqueWords) {
      setUniqueWordsItems(equalVerse(items));
      setItemIndex(0);
    }
    if (items && switchUniqueChapter) {
      const verses = equalVerse(items);

      setUniqueWordsItems(equalChapter(verses));
      setItemIndex(0);
      console.log(uniqueWordsItems);
      // console.log(listWordsChapter[chapter]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, switchUniqueWords, switchUniqueChapter, listWordsChapter]);

  const {
    state: { item, headers, filters, itemIndex, markdownView },
    actions: { setFilters, setItemIndex, setMarkdownView },
  } = useCardState({
    items: switchUniqueWords ? uniqueWordsItems : items,
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
      items={switchUniqueWords || switchUniqueChapter ? uniqueWordsItems : items}
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
        items={items}
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
