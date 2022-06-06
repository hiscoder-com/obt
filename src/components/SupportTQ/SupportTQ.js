import React, { useContext, useEffect, useState } from 'react';

import { Card, useContent, useCardState } from 'translation-helps-rcl';

import { SupportContent } from '../SupportContent';
import useSaveEdit from './useSaveEdit';
import { AuthenticationContext, createContent, readContent } from 'gitea-react-toolkit';
import axios from 'axios';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  TextField,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
  console.log({ contentFromCard });
  const handleSaveEdit = useSaveEdit({
    bookId,
    chapter,
    verse,
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

    createContent({
      config: {
        server: 'https://git.door43.org',
        tokenid: 'PlaygroundTesting',
      },
      owner: 'bsa',
      repo: `ru_tq`,
      branch: 'test',
      filepath: `comments/${bookId}/${chapter}/${verse}/` + Date.now() + '.json',
      content: JSON.stringify({ newComment, username }),
      message: 'newComment to commit',
      author: {
        username: username,
      },
      ...authentication,
    })
      .then((result) => console.log({ result }))
      .catch((error) => console.log({ error }));
    setNewComment('');
  };
  const fetchUrl = (url) => axios.get(url);
  const handleShowComments = () => {
    readContent({
      config: {
        server: 'https://git.door43.org',
        tokenid: 'PlaygroundTesting',
      },
      owner: 'bsa',
      repo: `${languageId}_${cardResourceId}`,
      ref: 'test',
      filepath: `comments/${bookId}/${chapter}/${verse}/`,
    })
      .then((result) => {
        console.log(result);
        const urls = result.map((el) => el.download_url).map(fetchUrl);
        Promise.all(urls)
          .then((result) => {
            setComments(result.map((el) => el.data));
          })
          .catch((error) => {
            console.log(error);
          });
      })
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
      <SupportContent
        setIsCloseable={setIsCloseable}
        config={tsvConfig}
        item={item}
        markdown={markdown}
        resourceStatus={resourceStatus}
        fontSize={fontSize}
        setContentFromCard={setContentFromCard}
      />

      <CommentsBlock
        newComment={newComment}
        setNewComment={setNewComment}
        hanldeSendComment={hanldeSendComment}
        handleShowComments={handleShowComments}
        comments={comments}
      />
    </Card>
  );
}

function CommentsBlock({
  newComment,
  setNewComment,
  hanldeSendComment,
  handleShowComments,
  comments,
  verse,
  chapter,
  book,
}) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Comments</Typography>
      </AccordionSummary>
      <AccordionDetails style={{ display: 'block' }}>
        <TextField value={newComment} onChange={(e) => setNewComment(e.target.value)} />
        <Button onClick={hanldeSendComment}>Send Comment</Button>
        <Button onClick={handleShowComments}>Show comments</Button>
        {comments &&
          comments.map((el, index) => (
            <div key={index}>
              {el.username} : {el.newComment}
            </div>
          ))}
      </AccordionDetails>
    </Accordion>
  );
}
