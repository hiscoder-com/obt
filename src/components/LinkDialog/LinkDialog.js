import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';

import { ReferenceContext } from '../../context';
import { DialogUI, MarkdownViewer } from '../../components';
import { CircularProgress } from '@material-ui/core';

function LinkDialog() {
  const [content, setContent] = useState('');
  const history = useHistory();
  const location = useLocation();
  const [config, setConfig] = useState();

  const {
    state: { dialogLink },
    actions: { setDialogLink },
  } = useContext(ReferenceContext);
  const onClose = () => {
    setDialogLink(null);
    setContent(null);
    history.push(location.pathname);
  };
  const fetchUrl = (url) => axios.get(url);
  useEffect(() => {
    if (!dialogLink) {
      return;
    }
    if (dialogLink.includes('#titul')) {
      const urls = dialogLink.split('#titul=').map(fetchUrl);
      Promise.all(urls)
        .then((result) => {
          setContent('# ' + result[1].data + '\n' + result[0].data);
        })
        .catch((error) => {
          console.log(error);
        });

      return;
    }
    axios
      .get(dialogLink)
      .then((result) => setContent(result.data))
      .catch((error) => console.log(error));
  }, [dialogLink]);
  useEffect(() => {
    if (!dialogLink) {
      return;
    }
    const configItems = dialogLink.split('/');

    setConfig({
      server: 'https://git.door43.org',
      owner: configItems[3] ?? 'door43-catalog',
      ref: configItems[7] ?? 'master',
      languageId: configItems[4].split('_')[0] ?? 'ru',
    });
  }, [dialogLink]);

  return (
    <div>
      <DialogUI open={Boolean(dialogLink)} onClose={onClose} title={' '}>
        <MarkdownViewer config={config}>
          {!content ? (
            <div>
              <CircularProgress color="primary" size={50} />
            </div>
          ) : (
            content
          )}
        </MarkdownViewer>
      </DialogUI>
    </div>
  );
}

export default LinkDialog;
