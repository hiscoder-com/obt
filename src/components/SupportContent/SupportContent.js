import React, { useEffect, useState } from 'react';

import { CircularProgress } from '@material-ui/core';

import { useTranslation } from 'react-i18next';

import { MarkdownViewer } from '../../components';
import { useCircularStyles, useNoContentStyles } from './style';

function SupportContent({
  item,
  config,
  fontSize,
  resourceStatus: { loading, contentNotFoundError, error },
  markdown,
}) {
  const [content, setContent] = useState(null);
  const classesCircular = useCircularStyles();
  const classesNoContent = useNoContentStyles();
  const { t } = useTranslation();
  const { resourceId } = config;

  useEffect(() => {
    if (markdown) {
      setContent(markdown);
      return;
    }
    if (!item) {
      return;
    }
    switch (resourceId) {
      case 'tn':
        item?.OccurrenceNote && setContent(item?.OccurrenceNote);
        item?.GLQuote && setContent((prev) => prev && '# ' + item?.GLQuote + '\n' + prev);

        break;
      case 'twl':
        item?.markdown && setContent(item?.markdown);
        break;
      case 'tq':
        item?.Response && setContent(item?.Response);
        item?.Question &&
          setContent((prev) => prev && '# ' + item?.Question + '\n' + prev);
        break;
      default:
        break;
    }
  }, [item, markdown, resourceId]);
  useEffect(() => {
    if (!content) {
      return;
    }
    setContent(content);
  }, [content]);

  return (
    <>
      {loading ? (
        <div className={classesCircular.root}>
          <CircularProgress color="primary" size={100} />
        </div>
      ) : (!contentNotFoundError || !error) && content ? (
        <MarkdownViewer fontSize={fontSize} config={config}>
          {content}
        </MarkdownViewer>
      ) : (
        <div className={classesNoContent.root}>{t('No_content')}</div>
      )}
    </>
  );
}

export default SupportContent;
