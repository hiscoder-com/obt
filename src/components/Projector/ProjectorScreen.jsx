import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
/*
  resource: {
    name
    owner
    title
  },
  reference:
    obs: {
      bookId
      chapter
      verse
    },
    bible: {
      bookId
      chapter
      verse
    }
  }
  resource.owner + '__' + resource.name,
 */
function ProjectorScreen(props) {
  const { fontSize, resource, reference, isObs } = props;
  const { t } = useTranslation();
  // const { currentResource, isObs } = content;

  // const [currentContent, setCurrentContent] = useState();

  // const [index, setIndex] = useState(0);

  // //const [isObs, setIsObs] = useState(localStorage.getItem('isObs') ?? false);

  // const [resource, setResource] = useState(
  //   JSON.parse(localStorage.getItem('projectorResource')) ?? {}
  // );

  // const [reference, setReference] = useState(
  //   JSON.parse(localStorage.getItem('reference')) ?? {}
  // );

  //const { bookId, chapter, verse } = isObs === 'true' ? reference.obs : reference.bible;

  // useEffect(() => {
  //   setCurrentContent(localStorage.getItem(resource.owner + '__' + resource.name));
  // }, [resource.name, resource.owner, index, bookId, chapter, verse]);

  return (
    <Box fontSize={fontSize * 2 + '%'}>
      <ReactMarkdown>{props?.[resource?.owner + '__' + resource?.name]}</ReactMarkdown>
      {/*<div>{`${t(bookId)} ${chapter}:${verse}`}</div>*/}
      <div>{resource?.title}</div>
    </Box>
  );
}

export default ProjectorScreen;
