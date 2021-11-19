import React from 'react';

import { useContent } from 'translation-helps-rcl';
import { CircularProgress } from '@material-ui/core';
import { DialogUI } from '../../components';
import ReactMarkdown from 'react-markdown';

function FrontModal({ config, open, onCloseDialog }) {
  const { items, resourceStatus } = useContent(config);
  const content =
    resourceStatus.contentNotFoundError || resourceStatus.error || items === null
      ? 'No content available'
      : items &&
        items.length > 0 &&
        items[0].OccurrenceNote.replace(/(<(\/?[^>]+)>)/g, '\n');
  const loadingContent = (
    <div>
      <CircularProgress color="primary" size={50} />
    </div>
  );
  return (
    <div>
      <DialogUI open={open} onClose={onCloseDialog}>
        {resourceStatus.loading ? (
          loadingContent
        ) : (
          <ReactMarkdown className={'md'}>{content}</ReactMarkdown>
        )}
      </DialogUI>
    </div>
  );
}
export default FrontModal;
