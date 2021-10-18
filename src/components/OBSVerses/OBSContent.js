import React, { useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ContextMenu } from '../ContextMenu';
import { ReferenceContext } from '../../context';
import { useScrollToVerse } from '../../hooks';

const initialPositionContextMenu = {
  left: null,
  top: null,
};

function OBSContent({ markdown, verse, chapter, fontSize, type, goToBookChapterVerse }) {
  const [positionContextMenu, setPositionContextMenu] = useState(
    initialPositionContextMenu
  );
  const {
    state: { referenceSelected },
    actions: { setReferenceBlock },
  } = useContext(ReferenceContext);

  const handleContextOpen = (event) => {
    event.preventDefault();
    setPositionContextMenu({
      left: event.clientX - 2,
      top: event.clientY - 4,
    });
  };

  const { t } = useTranslation();
  const [verses, setVerses] = useState();

  const [verseRef] = useScrollToVerse();

  const mdToVerses = (md) => {
    let _markdown = md.split(/\n[\s]*/);
    const headerMd = _markdown.shift().trim().slice(1);
    let linkMd = _markdown.pop().trim().slice(1, -1);
    if (linkMd === '') {
      linkMd = _markdown.pop().trim().slice(1, -1);
    }
    const versesObject = [];

    for (let n = 0; n < _markdown.length / 2; n++) {
      let urlImage;
      let text;
      if (/\(([^)]*)\)/g.test(_markdown[n * 2])) {
        urlImage = /\(([^)]*)\)/g.exec(_markdown[n * 2])[1];
        text = _markdown[n * 2 + 1];
      } else {
        text = _markdown[n * 2] + '\n' + _markdown[n * 2 + 1];
      }
      versesObject.push({ urlImage, text, key: (n + 1).toString() });
    }

    return { versesObject, headerMd, linkMd };
  };

  useEffect(() => {
    if (markdown) {
      const { versesObject, headerMd, linkMd } = mdToVerses(markdown);
      const contentMd = versesObject.map((item) => {
        const { key, urlImage, text } = item;
        const verseStyle = {
          fontSize: fontSize + '%',
        };
        return (
          <div
            ref={(ref) => {
              key === verse && verseRef(ref);
            }}
            className={'verse' + (parseInt(key) === parseInt(verse) ? ' current' : '')}
            key={key}
            onClick={() => {
              goToBookChapterVerse('obs', chapter, key);
            }}
          >
            {urlImage ? (
              <>
                <img src={urlImage} alt={`OBS verse #${key}`} />
                <br />
              </>
            ) : (
              ''
            )}
            {text.split('\n').map((el, index) => (
              <p
                style={verseStyle}
                key={index}
                onContextMenu={(e) => {
                  setReferenceBlock({
                    ...referenceSelected,
                    resource: type,
                    verse: key,
                    text: el,
                  });
                  handleContextOpen(e);
                }}
              >
                {el}
              </p>
            ))}
          </div>
        );
      });
      const versesOBS = (
        <>
          <h1>{headerMd}</h1>
          {contentMd}
          <br />
          <i>{linkMd}</i>
        </>
      );
      setVerses(versesOBS);
    } else {
      setVerses(<>{t('No_content')}</>);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markdown, verse, verseRef, t, fontSize, goToBookChapterVerse]);

  return (
    <>
      {verses}
      <ContextMenu position={positionContextMenu} setPosition={setPositionContextMenu} />
    </>
  );
}

export default OBSContent;
