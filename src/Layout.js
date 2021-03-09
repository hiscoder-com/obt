import React, { useState, useEffect } from 'react';

import {
  ResourcesContextProvider,
  ReferenceSelectedContextProvider,
} from 'scripture-resources-rcl';

import { Workspace } from 'resource-workspace-rcl';
import Chapter from './Chapter';
import SupportQuestion from './SupportQuestion';
import SupportNotes from './SupportNotes';

import { makeStyles } from '@material-ui/core/styles';
import './layout.css';

const config = { server: 'https://git.door43.org' };

const useStyles = makeStyles(() => ({
  root: {
    padding: '0 !important',
    margin: '0 1px !important',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  dragIndicator: {},
}));

const _absoluteLayout =
  localStorage.getItem('layout') != null
    ? JSON.parse(localStorage.getItem('layout'))
    : [
        { w: 4, h: 5, x: 0, y: 0, i: '1' },
        { w: 4, h: 5, x: 4, y: 0, i: '2' },
        { w: 4, h: 5, x: 8, y: 0, i: '3' },
        { w: 6, h: 3, x: 0, y: 6, i: '4' },
        { w: 6, h: 3, x: 6, y: 6, i: '5' },
      ];

const _resourceLinks = ['bsa/ru/rlob/master', 'bsa/ru/rsob/master', 'bsa/ru/rob/master'];

export default function Layout() {
  const [resourceLinks, setResourceLinks] = useState(_resourceLinks);
  const [resources, setResources] = useState([]);
  const [bookId, setBookId] = useState('tit');
  const [chapter, setChapter] = useState(1);
  const reference = { bookId, chapter };

  localStorage.setItem('layout', JSON.stringify(_absoluteLayout));
  const [absoluteLayout, setAbsoluteLayout] = useState(_absoluteLayout);

  const layout = {
    absolute: absoluteLayout,
  };

  function onLayoutChange(layout) {
    localStorage.setItem('layout', JSON.stringify(layout));
  }

  const onClose = (index) => {
    setAbsoluteLayout(layout.absolute.filter((el) => el.i != index));
  };

  const classes = useStyles();

  const [referenceSelected, setReferenceSelected] = React.useState({
    ...reference,
  });

  useEffect(() => {
    if (referenceSelected && referenceSelected.verse) {
      //alert(JSON.stringify(referenceSelected));
    }
  }, [referenceSelected]);

  return (
    <ResourcesContextProvider
      reference={reference}
      resourceLinks={resourceLinks}
      defaultResourceLinks={_resourceLinks}
      onResourceLinks={setResourceLinks}
      resources={resources}
      onResources={setResources}
      config={config}
    >
      <ReferenceSelectedContextProvider
        referenceSelected={referenceSelected}
        onReferenceSelected={setReferenceSelected}
      >
        <Workspace
          gridMargin={[15, 15]}
          classes={classes}
          layout={layout}
          onLayoutChange={onLayoutChange}
        >
          <Chapter
            type="0"
            title="RLOB"
            classes={classes}
            onClose={onClose}
            index={'1'}
          />
          <Chapter
            type="1"
            title="RSOB"
            classes={classes}
            onClose={onClose}
            index={'2'}
          />
          <Chapter type="2" title="ROB" classes={classes} onClose={onClose} index={'3'} />
          <SupportQuestion title="TQ" classes={classes} onClose={onClose} index={'4'} />
          <SupportNotes title="TN TSV" classes={classes} onClose={onClose} index={'5'} />
        </Workspace>
      </ReferenceSelectedContextProvider>
    </ResourcesContextProvider>
  );
}
