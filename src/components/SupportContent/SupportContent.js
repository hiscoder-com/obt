import React, { useEffect, useState } from 'react';

import { CircularProgress } from '@material-ui/core';

import { useTranslation } from 'react-i18next';
import { useProjector } from '@texttree/projector-mode-rcl';

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
  const { setData } = useProjector();
  const { resourceId } = config;

  useEffect(() => {
    if (content) {
      setData(config.owner + '__' + config.languageId + '_' + config.resourceId, content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  useEffect(() => {
    if (markdown) {
      setContent(markdown);
      return;
    }
    if (!item) {
      setContent(null);
      return;
    }
    switch (resourceId) {
      case 'tn':
        item?.OccurrenceNote && setContent(item?.OccurrenceNote);
        item?.GLQuote && setContent((prev) => prev && '# ' + item?.GLQuote + '\n' + prev);

        break;
      case 'obs-sn':
      case 'obs-tn':
        item?.Note && setContent(item?.Note);
        item?.Quote && setContent((prev) => prev && '# ' + item?.Quote + '\n' + prev);

        break;
      case 'obs-tq':
        item?.Response && setContent(item?.Response);
        item?.Question &&
          setContent((prev) => prev && '# ' + item?.Question + '\n' + prev);

        break;
      case 'twl':
      case 'obs-twl':
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
