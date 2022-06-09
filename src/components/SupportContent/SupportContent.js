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
  console.log({ markdown });
  useEffect(() => {
    if (markdown) {
      setContent(markdown);
      return;
    }
    if (!item) {
      return;
    }
    console.log({ content, resourceId });
    switch (resourceId) {
      case 'tn':
        setContent(`## ${item?.GLQuote ?? ''} \n ${item?.OccurrenceNote ?? ''}`);

        break;
      case 'obs-sn':
      case 'obs-tn':
        setContent(`## ${item?.Quote ?? ''} \n ${item?.Note ?? ''}`);

        break;
      case 'obs-tq':
        setContent(`## ${item?.Question ?? ''} \n ${item?.Response ?? ''}`);

        break;
      case 'twl':
      case 'obs-twl':
        item?.markdown && setContent(item?.markdown);
        break;

      case 'tq':
        setContent(`## ${item?.Question ?? ''} \n ${item?.Response ?? ''}`);
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
