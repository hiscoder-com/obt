import React, { useEffect, useContext } from 'react';

import { Box } from '@material-ui/core';

import { Card, CardContent, useContent, useCardState } from 'translation-helps-rcl';

import { AppContext } from '../../context';

import { ListWords } from '../../components';

import {
  useListWordsReference,
  useSelectTypeUniqueWords,
  useChahgeColorTWL,
} from '../../hooks';

import useStyles from './style';

export default function SupportOBSTWL({
  title,
  classes,
  onClose,
  type,
  server,
  fontSize,
  reference: { bookId, chapter, verse },
  resource,
}) {
  const {
    state: { switchTypeUniqueWords, switchHideRepeatedWords },
  } = useContext(AppContext);
  const classesLocal = useStyles();

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
    resourceId: 'obs-twl',
    owner: resource.owner ?? 'door43-catalog',
    server,
  });

  const { listWordsReference, listWordsChapter } = useListWordsReference(tsvs, bookId);
  const { uniqueWordsItems } = useSelectTypeUniqueWords(
    items,
    switchTypeUniqueWords,
    listWordsReference,
    chapter,
    verse,
    listWordsChapter
  );

  const {
    state: { item, headers, filters, itemIndex, markdownView },
    actions: { setFilters, setItemIndex, setMarkdownView },
  } = useCardState({
    items: !switchHideRepeatedWords ? items : uniqueWordsItems,
  });
  useEffect(() => {
    setItemIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId, chapter, verse, switchHideRepeatedWords, switchTypeUniqueWords]);

  const { changeColor } = useChahgeColorTWL(
    items,
    switchHideRepeatedWords,
    uniqueWordsItems,
    itemIndex
  );

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
      </Box>
    </Card>
  );
}
