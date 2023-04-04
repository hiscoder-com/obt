import React, { useEffect, useContext, useState, useMemo } from 'react';

import { Box } from '@material-ui/core';
import { Card, useContent, useCardState } from 'translation-helps-rcl';

import { AppContext, ReferenceContext } from '../../context';

import { SupportContent } from '../../components';

import {
  useListWordsReference,
  useMarkRepeatedWords,
  ListReference,
} from '@texttree/filter-translation-words-rcl';

import useStyles from './style';

export default function SupportTWL(props) {
  const {
    state: { typeFilter, switchHideRepeatedWords },
  } = useContext(AppContext);
  const {
    state: { referenceSelected },
    actions: { goToBookChapterVerse },
  } = useContext(ReferenceContext);

  const { title, classes, onClose, type, server, fontSize, reference, resource } = props;
  const { bookId, chapter, verse } = reference;
  const classesLocal = useStyles();
  const [closed, setClosed] = useState(false);
  const config = {
    verse,
    chapter,
    projectId: bookId,
    listRef: resource.ref ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: 'twl',
    owner: resource.owner ?? 'door43-catalog',
    server,
    httpConfig: { noCache: true },
  };

  const { items, tsvs, resourceStatus } = useContent({
    ...config,
  });

  const { listWordsInBook } = useListWordsReference({ tsvs });
  const { markedWords } = useMarkRepeatedWords({ items, tsvs, type: 'all' });
  const filteredWords = useMemo(
    () => markedWords?.filter((word) => !word?.[typeFilter] && typeFilter !== 'disabled'),
    [markedWords, typeFilter]
  );

  const {
    state: { item, headers, filters, itemIndex, markdownView },
    actions: { setFilters, setItemIndex, setMarkdownView },
  } = useCardState({
    items: !switchHideRepeatedWords ? markedWords : filteredWords,
    verse,
    chapter,
    projectId: bookId,
  });

  useEffect(() => {
    setItemIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId, chapter, verse, switchHideRepeatedWords, typeFilter]);

  const onClickLink = (reference) => {
    goToBookChapterVerse(referenceSelected.bookId, reference[0], reference[1]);
    setClosed(true);
  };

  return (
    <Card
      closeable
      title={title}
      onClose={() => onClose(true)}
      classes={classes}
      id={type}
      items={!switchHideRepeatedWords ? markedWords : filteredWords}
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
      {(!switchHideRepeatedWords || filteredWords?.length > 0) && (
        <>
          <ListReference
            links={item && listWordsInBook?.[item.TWLink]}
            onClickLink={onClickLink}
            currentChapter={chapter}
            currentVerse={verse}
            closed={closed}
            setClosed={setClosed}
          />
        </>
      )}
      <Box className={item?.[typeFilter] ? classesLocal.twl : ''}>
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
