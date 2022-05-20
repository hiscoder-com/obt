import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
/*
  resource: {
    name
    owner
    title
  },
  obs: {
    'obs'
    chapter
    verse
  },
  bible: {
    bookId
    chapter
    verse
  }
  resource.owner + '__' + resource.name,
 */
function ProjectorScreen(props) {
  const { fontSize, resource, bible, obs, isObs } = props;
  const { t } = useTranslation();

  const { bookId, chapter, verse } = isObs === 'true' ? obs : bible;

  return (
    <Box fontSize={fontSize * 2 + '%'}>
      <ReactMarkdown>{props?.[resource?.owner + '__' + resource?.name]}</ReactMarkdown>
      <div>{`${t(bookId)} ${chapter}:${verse}`}</div>
      <div>{resource?.title}</div>
    </Box>
  );
}

export default ProjectorScreen;
