import React, { useContext } from 'react';

import ReactMarkdown from 'react-markdown';
import { Box, Link } from '@material-ui/core';

import { ReferenceContext } from '../../context';

function MarkdownViewer({ children, config, fontSize }) {
  const { server, owner, ref, languageId } = config;
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
  const changeUri = ({ uri, server, owner, ref, languageId }) => {
    if (!uri) {
      return;
    }
    const _link = uri.replace('rc://*/', '').replace('rc://', '');
    const tw = ['/other/', '/kt/', '/names/'];
    let titleUrl = '';
    let url = '';
    const reference = _link.split('/');
    if (tw.find((item) => _link.includes(item)) && reference) {
      const resourceId = 'tw';
      const filePath = `${reference[1]}/${reference[2]}`;
      url = `#page=${server}/${owner}/${languageId}_${resourceId}/raw/branch/${ref}/bible/${filePath}`;
      // https://git.door43.org/Door43-Catalog/ru_tw/raw/branch/master/bible/other/elder.md
      return url;
    }
    if (_link.includes('/ta/man/')) {
      const resourceId = 'ta';

      const filePath = `${reference[3]}/${reference[4]}`;
      url = `#page=${server}/${owner}/${languageId}_${resourceId}/raw/branch/${ref}/${filePath}/01.md`;

      // https://git.door43.org/ru_gl/ru_ta/raw/branch/master/translate/translate-names/01.md

      titleUrl = `#titul=${server}/${owner}/${languageId}_${resourceId}/raw/branch/${ref}/${filePath}/title.md`;

      // https://git.door43.org/ru_gl/ru_ta/raw/branch/master/translate/translate-names/title.md

      return url + titleUrl;
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
              return <span>{props.children[0]}</span>;
            }
            return props.href.startsWith('/') ? (
              <div
                color={'primary'}
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
        {children}
      </ReactMarkdown>
    </Box>
  );
}

export default MarkdownViewer;
