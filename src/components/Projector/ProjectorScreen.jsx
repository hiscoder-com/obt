import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useStyles } from './style';
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
  const classes = useStyles();
  const { fontSize, resource, bible, obs, isObs } = props;
  const { t } = useTranslation();

  const { bookId, chapter, verse } = isObs ? obs : bible;

  return (
    <Box
      className={classes.wrap}
      fontWeight={
        [
          'Bible',
          'Aligned Bible',
          'Hebrew Old Testament',
          'Greek New Testament',
          'Open Bible Stories',
        ].includes(resource?.subject)
          ? 'bold'
          : 'inherit'
      }
    >
      <Box fontSize={fontSize * 2 + '%'} className={classes.content}>
        <ReactMarkdown
          components={{
            a: ({ children }) => <span>{children}</span>,
          }}
        >
          {props?.[resource?.owner + '__' + resource?.name]}
        </ReactMarkdown>
      </Box>
      <div className={classes.bottomLine}>
        <div>{`${t(bookId)} ${chapter}:${verse}`}</div>
        <div className={classes.resource}>{resource?.title}</div>
      </div>
    </Box>
  );
}

export default ProjectorScreen;
