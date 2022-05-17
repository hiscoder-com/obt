import React, { useContext } from 'react';

import ReactMarkdown from 'react-markdown';
import { Box, Link } from '@material-ui/core';

import { ReferenceContext } from '../../context';
import useStyles from './style';
import { fixUrl } from '../../helper';

function MarkdownViewer({ children, config, fontSize }) {
  const { server, owner, ref, languageId, projectId } = config;
  const classes = useStyles();
  const {
    actions: { goToBookChapterVerse },
  } = useContext(ReferenceContext);
  const transformLinkUri = (uri) => {
    return changeUri({
      uri,
      server,
      owner,
      ref,
      languageId,
    });
  };

  const content = typeof children === 'string' ? fixUrl(children) : '';
  const changeUri = ({ uri, server, owner, languageId }) => {
    if (!uri) {
      return;
    }

    const _link = uri.replace('rc://*', languageId).replace('rc://', '');
    const tw = ['/other/', '/kt/', '/names/'];
    let url = '';
    const reference = _link.split('/');
    if (tw.find((item) => _link.includes(item)) && reference) {
      const resourceId = 'tw';
      let filePath = '';
      switch (reference.length) {
        case 3:
          filePath = `${reference[1]}/${reference[2]}`;
          url = `#page=${server}/${owner}/${languageId}_${resourceId}/raw/branch/master/bible/${filePath}`;
          break;
        case 6:
          filePath = `${reference[4]}/${reference[5]}`;
          url = `#page=${server}/${owner}/${languageId}_${resourceId}/raw/branch/master/bible/${filePath}.md`;
          break;
        default:
          break;
      }
      return url;
    }
    if (_link.includes('/ta/man/')) {
      const resourceId = 'ta';
      const filePath = `${reference[3]}/${reference[4]}`;
      url = `#page=${server}/${owner}/${languageId}_${resourceId}/raw/branch/master/${filePath}/01.md`;
      return url;
    }
    if (_link.includes('/help/')) {
      url = `/${reference[3]}/${String(parseInt(reference[4]))}/${String(
        parseInt(reference[5])
      )}`;
      return url;
    }
  };
  const verseStyle = {
    fontSize: fontSize + '%',
  };
  return (
    <Box style={verseStyle}>
      <ReactMarkdown
        components={{
          a: (props) => {
            if (!props?.href) {
              if (
                props?.node?.properties?.href &&
                props?.node?.properties?.href.match(/[0-9]{1,2}\/[0-9]{1,2}/gm)
              ) {
                return (
                  <div
                    className={classes.link}
                    onClick={() => {
                      const reference = props.node.properties.href.split('/');

                      goToBookChapterVerse(
                        projectId,
                        String(parseInt(reference[0])),
                        String(parseInt(reference[1]))
                      );
                    }}
                  >
                    {props.children[0]}
                  </div>
                );
              }
              return <span>{props.children[0]}</span>;
            }
            return props.href.startsWith('/') ? (
              <div
                className={classes.link}
                onClick={() => {
                  const reference = props.href.split('/');

                  goToBookChapterVerse(reference[1], reference[2], reference[3]);
                }}
              >
                {props.children}
              </div>
            ) : (
              <Link href={props.href}>{props.children}</Link>
            );
          },
        }}
        transformLinkUri={transformLinkUri}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}

export default MarkdownViewer;
