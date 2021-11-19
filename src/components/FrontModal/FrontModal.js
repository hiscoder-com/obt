import React from 'react';

import { useContent } from 'translation-helps-rcl';
import { CircularProgress } from '@material-ui/core';
import { DialogUI } from '../../components';
import ReactMarkdown from 'react-markdown';

function FrontModal({
  config,
  open,
  onCloseDialog,
  field = 'OccurrenceNote',
  title = false,
  isTSV = true,
}) {
  const data = useContent(config);
  const { items, resourceStatus, markdown } = data;
  let content = 'No content available';
  if (isTSV) {
    content =
      resourceStatus.contentNotFoundError ||
      resourceStatus.error ||
      items === null ||
      items.length === 0
        ? 'No content available'
        : items[0][field].replace(/(<\/?br( ?\/)?>)/g, '\n');
  } else {
    content =
      resourceStatus.contentNotFoundError ||
      resourceStatus.error ||
      markdown === null ||
      markdown.length === 0
        ? 'No content available'
        : markdown.replace(/(<\/?br( ?\/)?>)/g, '\n');
  }
  const loadingContent = (
    <div>
      <CircularProgress color="primary" size={50} />
    </div>
  );
  return (
    <div>
      <DialogUI title={title} open={open} onClose={onCloseDialog}>
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
