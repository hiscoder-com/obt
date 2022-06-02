import React, { useContext, useState } from 'react';

import { Card, useContent, useCardState } from 'translation-helps-rcl';

import { SupportContent } from '../SupportContent';
import useSaveEdit from './useSaveEdit';
import { AuthenticationContext, createContent, readContent } from 'gitea-react-toolkit';

export default function SupportTQ({
  title,
  classes,
  onClose,
  type,
  server,
  fontSize,
  reference: { bookId, chapter, verse },
  resource,
}) {
  const mdConfig = {
    projectId: bookId,
    ref: resource.ref ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: 'tq',
    filePath:
      String(chapter).padStart(2, '0') + '/' + String(verse).padStart(2, '0') + '.md',
    owner: resource.owner ?? 'door43-catalog',
    server,
  };
  const tsvConfig = {
    verse: String(verse),
    chapter: String(chapter),
    projectId: bookId,
    ref: resource.ref ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: 'tq',
    owner: resource.owner ?? 'door43-catalog',
    server,
  };
  // const { markdown, items, resourceStatus } = useContent(
  //   resource.subject === 'TSV Translation Questions' ? { ...tsvConfig } : { ...mdConfig }
  // );
  // const {
  //   state: { item, headers, filters, itemIndex, markdownView },
  //   actions: { setFilters, setItemIndex, setMarkdownView },
  // } = useCardState({
  //   items,
  // });
  const { state: authentication } = useContext(AuthenticationContext);
  const {
    markdown,
    items,
    resourceStatus,
    isLoading,
    fetchResponse,
    props: { languageId },
  } = useContent({
    verse,
    chapter,
    projectId: bookId,
    ref: 'master',
    listRef: 'master',
    languageId: 'ru',
    resourceId: 'tq',
    filePath:
      String(chapter).padStart(2, '0') + '/' + String(verse).padStart(2, '0') + '.md',
    owner: 'Valyukhov',
    server: 'https://git.door43.org',
    httpConfig: { noCache: true },
  });
  console.log({ items });
  const {
    state: { item, headers, filters, itemIndex, markdownView },
    actions: { setFilters, setFontSize, setItemIndex, setMarkdownView },
  } = useCardState({
    items,
  });
  const cardResourceId = 'tq';

  const [isCloseable, setIsCloseable] = useState(true);
  const username = authentication?.user?.username;
  const [contentFromCard, setContentFromCard] = useState('');
  const handleSaveEdit = useSaveEdit({
    item,
    fetchResponse,
    cardResourceId,
    owner: 'bsa',
    contentFromCard,
    authentication,
    languageId,
  });
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState('');
  const hanldeSendComment = () => {
    if (!newComment) {
      return;
    }
    console.log(authentication);
    createContent({
      config: {
        server: 'https://git.door43.org',
        tokenid: 'PlaygroundTesting',
      },
      owner: 'bsa',
      repo: `${languageId}_${cardResourceId}`,
      branch: 'test',
      filepath: '1co/2/2/' + Date.now() + '.json',
      content: JSON.stringify({ newComment, username }),
      message: 'newComment to commit',
      author: {
        username: username,
      },
      ...authentication,
    })
      .then((result) => console.log({ result }))
      .catch((error) => console.log({ error }));
  };
  const handleShowComments = () => {
    readContent({
      config: {
        server: 'https://git.door43.org',
        tokenid: 'PlaygroundTesting',
      },
      owner: 'bsa',
      repo: `${languageId}_${cardResourceId}`,
      ref: 'test',
      filepath: '1co',
    })
      .then((result) => console.log({ result }))
      .catch((error) => console.log({ error }));
  };
  return (
    <Card
      editable
      closeable={isCloseable}
      title={title}
      onClose={() => onClose(true)}
      classes={{ ...classes, children: 'tqcard' }}
      onSaveEdit={() => {
        handleSaveEdit();
        setIsCloseable(true);
      }}
      id={type}
      items={items}
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
      <div>comments:</div>
      <button onClick={handleShowComments}>Show comments</button>
      <input onChange={(e) => setNewComment(e.target.value)} />
      <button onClick={hanldeSendComment}>Send Comment</button>
      <SupportContent
        setIsCloseable={setIsCloseable}
        config={tsvConfig}
        item={item}
        markdown={markdown}
        resourceStatus={resourceStatus}
        fontSize={fontSize}
        setContentFromCard={setContentFromCard}
      />
    </Card>
  );
}
