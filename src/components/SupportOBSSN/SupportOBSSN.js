import React from 'react';
import { FrontModal } from '../FrontModal';
import { Card, CardContent, useContent, useCardState } from 'translation-helps-rcl';
import { ButtonGroupUI } from '../ButtonGroupUI';

export default function SupportOBSSN(props) {
  const { title, classes, onClose, type, server, fontSize, reference, resource } = props;
  const [openDialog, setOpenDialog] = React.useState(false);
  const [configFront, setConfigFront] = React.useState({});
  const { bookId, chapter, verse } = reference;

  const config = {
    projectId: bookId,
    ref: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: 'obs-sn',
    verse,
    chapter,
    owner: resource.owner ?? 'door43-catalog',
    server,
  };
  const {
    items,
    resourceStatus: { loading },
    props: { languageId },
  } = useContent({ ...config });

  const {
    state: { item, headers, itemIndex, markdownView },
    actions: { setFilters, setItemIndex, setMarkdownView },
  } = useCardState({
    items,
    verse,
    chapter,
    projectId: bookId,
    resourceId: 'sn',
  });
  const filterArray = ['Quote', 'Note'];

  const onFirstButtonClick = () => {
    setConfigFront({ ...config, verse: 'intro', chapter: 'front' });
    setOpenDialog(true);
  };
  const onSecondButtonClick = () => {
    setConfigFront({ ...config, verse: 'intro' });
    setOpenDialog(true);
  };
  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Card
      closeable
      title={title}
      onClose={() => onClose(type)}
      classes={{ ...classes, children: 'tqcard' }}
      id={type}
      items={items}
      headers={headers}
      filters={filterArray}
      fontSize={fontSize}
      itemIndex={itemIndex}
      setFilters={setFilters}
      setItemIndex={setItemIndex}
      markdownView={markdownView}
      setMarkdownView={setMarkdownView}
    >
      {items && false && (
        <ButtonGroupUI
          buttons={[
            { title: 'Introduction', onClick: onFirstButtonClick },
            { title: 'General_notes', onClick: onSecondButtonClick },
          ]}
        />
      )}

      {configFront.projectId && (
        <FrontModal
          onCloseDialog={onCloseDialog}
          open={openDialog}
          config={configFront}
        />
      )}

      <CardContent
        item={item}
        filters={filterArray}
        fontSize={fontSize}
        viewMode="table"
        isLoading={Boolean(loading)}
        languageId={languageId}
        markdownView={markdownView}
      />
    </Card>
  );
}
