import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useStyles } from './style';
import useOnScreen from '../../hooks/useOnScreen';

function ProjectorScreen(props) {
  const classes = useStyles();
  const topRef = useRef();
  const bottomRef = useRef();
  let isTop = useOnScreen(topRef);
  let isBottom = useOnScreen(bottomRef);
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
        <div ref={topRef} className={classes.top}></div>
        <ReactMarkdown
          components={{
            a: ({ children }) => <span>{children}</span>,
          }}
        >
          {props?.[resource?.owner + '__' + resource?.name]}
        </ReactMarkdown>
        <div ref={bottomRef} className={classes.bottom}></div>
      </Box>
      <div className={classes.topLine}></div>
      {isBottom || (
        <div className={classes.topArrow}>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30px"
            viewBox="0 0 10 5"
            enableBackground="new 0 0 10 5"
            xmlSpace="preserve"
          >
            <g>
              <path d="M0,0L5,5L10,0z" />
            </g>
          </svg>
        </div>
      )}
      {isTop || (
        <div className={classes.bottomArrow}>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30px"
            viewBox="0 0 10 5"
            enableBackground="new 0 0 10 5"
            xmlSpace="preserve"
          >
            <g>
              <path d="M0,5L5,0L10,5z" />
            </g>
          </svg>
        </div>
      )}
      <div className={classes.bottomBlock}>
        <div className={classes.bottomLine}>
          <div className={classes.reference}>{`${t(bookId)} ${chapter}:${verse}`}</div>
          <div className={classes.resource}>{resource?.title}</div>
        </div>
      </div>
    </Box>
  );
}

export default ProjectorScreen;
