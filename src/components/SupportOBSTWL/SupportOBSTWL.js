import React, { useEffect, useContext, useState } from 'react';

import { Box } from '@material-ui/core';
import { Card, useContent, useCardState } from 'translation-helps-rcl';

import { AppContext, ReferenceContext } from '../../context';
import { SupportContent } from '../../components';

import {
  useListWordsReference,
  useSelectTypeUniqueWords,
  useIsRepeated,
  ListReference,
} from '@texttree/filter-translation-words-rcl';

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
  const {
    state: { referenceSelected },
    actions: { goToBookChapterVerse },
  } = useContext(ReferenceContext);
  const classesLocal = useStyles();
  const [closed, setClosed] = useState(false);

  const config = {
    verse,
    chapter,
    projectId: bookId,
    ref: resource.ref ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: 'obs-twl',
    owner: resource.owner ?? 'door43-catalog',
    server,
  };
  const { markdown, items, resourceStatus, tsvs } = useContent(config);

  const { listWordsReference, listWordsChapter } = useListWordsReference(tsvs, bookId);
  const { uniqueWordsItems } = useSelectTypeUniqueWords({
    items,
    typeUniqueWords: switchTypeUniqueWords,
    listWordsReference,
    chapter,
    verse,
    listWordsChapter,
  });

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

  const isRepeated = useIsRepeated({
    items,
    hideRepeatedWords: switchHideRepeatedWords,
    uniqueWordsItems,
    itemIndex,
  });
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
        <ListReference
          links={item && listWordsReference && listWordsReference[item.TWLink]}
          onClickLink={onClickLink}
          currentChapter={chapter}
          currentVerse={verse}
          closed={closed}
          setClosed={setClosed}
        />
      )}
      <Box className={isRepeated ? classesLocal.twl : ''}>
        <SupportContent
          config={config}
          item={item}
          resourceStatus={resourceStatus}
          fontSize={fontSize}
          markdown={markdown}
        />
      </Box>
    </Card>
  );
}
