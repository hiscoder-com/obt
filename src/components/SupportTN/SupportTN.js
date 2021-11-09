import React, { useState, useEffect } from 'react';

import { Card, CardContent, useContent, useCardState } from 'translation-helps-rcl';
import { AccordionUI } from '../../components';
import ButtonGroupUI from '../ButtonGroupUI/ButtonGroupUI';
import { DialogUI } from '../DialogUI';
import ReactMarkdown from 'react-markdown';
export default function SupportTN(props) {
  const { title, classes, onClose, type, server, fontSize, reference, resource } = props;

  const [selectedQuote, setQuote] = useState({});
  const { bookId, chapter, verse } = reference;
  const [openDialog, setOpenDialog] = useState(false);
  const [content, setContent] = useState('');
  const references = {
    front: { verse: 'intro', chapter: 'front' },
    frontChapter: { verse: 'front', chapter: String(chapter) },
    other: { verse: String(verse), chapter: String(chapter) },
  };

  const {
    markdown,
    items,
    resourceStatus: { loading },
    props: { languageId },
  } = useContent({
    verse: String(verse),
    chapter: String(chapter),
    projectId: bookId,
    ref: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: 'tn',
    owner: resource.owner ?? 'door43-catalog',
    server,
  });

  const { items: frontItem } = useContent({
    verse: 'intro',
    chapter: 'front',
    projectId: bookId,
    ref: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: 'tn',
    owner: resource.owner ?? 'door43-catalog',
    server,
  });
  const { items: frontChapter } = useContent({
    verse: 'intro',
    chapter: String(chapter),
    projectId: bookId,
    ref: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: 'tn',
    owner: resource.owner ?? 'door43-catalog',
    server,
  });

  if (frontItem && frontItem.length > 0) {
    console.log(frontItem);
  }
  const {
    state: { item, headers, itemIndex, markdownView },
    actions: { setItemIndex, setMarkdownView },
  } = useCardState({
    items,
  });
  const onBookClick = () => {
    frontItem && frontItem.length > 0 && setContent(frontItem[0].OccurrenceNote);
    setOpenDialog(true);
  };
  const onChapterClick = () => {
    frontChapter && frontChapter.length > 0 && setContent(frontChapter[0].OccurrenceNote);
    setOpenDialog(true);
  };
  const onCloseDialog = () => {
    setOpenDialog(false);
  };
  useEffect(() => {
    setItemIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference]);

  const filterArray = ['OrigQuote', 'GLQuote', 'OccurrenceNote'];
  useEffect(() => {}, [frontItem]);

  return (
    <Card
      closeable
      title={title}
      onClose={() => onClose(type)}
      classes={classes}
      id={type}
      items={items}
      fontSize={fontSize}
      headers={headers}
      filters={filterArray}
      itemIndex={itemIndex}
      setItemIndex={setItemIndex}
      markdownView={markdownView}
      setMarkdownView={setMarkdownView}
    >
      {/* <AccordionUI
        content={frontItem && frontItem.length > 0 && frontItem[0].OccurrenceNote}
      /> */}
      <ButtonGroupUI
        onBookClick={onBookClick}
        onChapterClick={onChapterClick}
      ></ButtonGroupUI>
      <DialogUI open={openDialog} onClose={onCloseDialog}>
        <ReactMarkdown>
          {content ? content.replace(/(\<(\/?[^>]+)>)/g, '\n') : ''}
        </ReactMarkdown>
      </DialogUI>
      <DialogUI open={openDialog} onClose={onCloseDialog}>
        <ReactMarkdown>
          {content ? content.replace(/(\<(\/?[^>]+)>)/g, '\n') : ''}
        </ReactMarkdown>
      </DialogUI>
      <CardContent
        item={item}
        viewMode="table"
        filters={filterArray}
        markdown={markdown}
        fontSize={fontSize}
        isLoading={Boolean(loading)}
        languageId={languageId}
        markdownView={markdownView}
        selectedQuote={selectedQuote}
        setQuote={setQuote}
      />
    </Card>
  );
}
