import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { useHistory, useLocation } from 'react-router-dom';
import { ReferenceContext } from '../../context';
import { DialogUI } from '../DialogUI';
import { MarkdownViewer } from '../MarkdownViewer';

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
  useEffect(() => {
    if (!dialogLink) {
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
      <DialogUI open={Boolean(dialogLink)} onClose={onClose}>
        <MarkdownViewer config={config}>{content && content}</MarkdownViewer>
      </DialogUI>
    </div>
  );
}

export default LinkDialog;
