import React, { useState } from 'react';

import { useContent } from 'translation-helps-rcl';

import { DialogUI } from '../DialogUI';
import ReactMarkdown from 'react-markdown';

function FrontModal({ config }) {
  const { items } = useContent(config);
  const [openDialog, setOpenDialog] = useState(false);
  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <DialogUI open={openDialog} onClose={onCloseDialog}>
        <ReactMarkdown>
          {items[0].OccurrenceNote.replace(/(<(\/?[^>]+)>)/g, '\n')}
        </ReactMarkdown>
      </DialogUI>
    </div>
  );
}

export default FrontModal;
