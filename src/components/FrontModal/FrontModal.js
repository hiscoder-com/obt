import React, { useState } from 'react';

import { useContent } from 'translation-helps-rcl';

import ButtonGroupUI from '../ButtonGroupUI/ButtonGroupUI';
import { DialogUI } from '../DialogUI';
import ReactMarkdown from 'react-markdown';

function FrontModal({ type, server, resource, reference }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [content, setContent] = useState('');

  const { items: frontBook } = useContent({
    verse: 'intro',
    chapter: 'front',
    projectId: reference.bookId,
    ref: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: 'tn',
    owner: resource.owner ?? 'door43-catalog',
    server,
  });
  const { items: frontChapter } = useContent({
    verse: 'intro',
    chapter: String(reference.chapter),
    projectId: reference.bookId,
    ref: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: 'tn',
    owner: resource.owner ?? 'door43-catalog',
    server,
  });
  const onBookClick = () => {
    frontBook && frontBook.length > 0 && setContent(frontBook[0].OccurrenceNote);
    setOpenDialog(true);
  };
  const onChapterClick = () => {
    frontChapter && frontChapter.length > 0 && setContent(frontChapter[0].OccurrenceNote);
    setOpenDialog(true);
  };
  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <ButtonGroupUI onBookClick={onBookClick} onChapterClick={onChapterClick} />
      <DialogUI open={openDialog} onClose={onCloseDialog}>
        <ReactMarkdown>
          {content ? content.replace(/(<(\/?[^>]+)>)/g, '\n') : 'No content'}
        </ReactMarkdown>
      </DialogUI>
    </div>
  );
}

export default FrontModal;
