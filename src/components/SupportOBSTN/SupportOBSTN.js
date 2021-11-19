import React, { useEffect } from 'react';

import { Card, CardContent, useContent, useCardState } from 'translation-helps-rcl';
import { useTranslation } from 'react-i18next';

import { FrontModal } from '../FrontModal';
import { ButtonGroupUI } from '../ButtonGroupUI';

// TODO TSV format support
export default function SupportOBSTN({
  title,
  classes,
  onClose,
  type,
  server,
  fontSize,
  reference: { bookId, chapter, verse },
  resource,
}) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [configFront, setConfigFront] = React.useState({});
  const { t } = useTranslation();
  const config = {
    projectId: bookId,
    ref: resource.branch ?? 'master',
    languageId: resource.languageId ?? 'ru',
    resourceId: 'obs-tn',
    filePath:
      String(chapter).padStart(2, '0') + '/' + String(verse).padStart(2, '0') + '.md',
    owner: resource.owner ?? 'door43-catalog',
    server,
  };

  const {
    markdown,
    items,
    resourceStatus: { loading },
    props: { languageId },
  } = useContent(config);
  const {
    state: { item, headers, filters, itemIndex, markdownView },
    actions: { setFilters, setItemIndex, setMarkdownView },
  } = useCardState({
    items,
  });

  const titleClick = () => {
    setConfigFront({
      ...config,
      filePath: String(chapter).padStart(2, '0') + '/00.md',
    });
    setOpenDialog(true);
  };
  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    setItemIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId, chapter, verse]);

  return (
    <Card
      closeable
      title={title}
      onClose={() => onClose(type)}
      classes={{ ...classes, children: 'tqcard' }}
      id={type}
      items={items}
      headers={headers}
      filters={filters}
      fontSize={fontSize}
      itemIndex={itemIndex}
      setFilters={setFilters}
      setItemIndex={setItemIndex}
      markdownView={markdownView}
      setMarkdownView={setMarkdownView}
    >
      {markdown && (
        <ButtonGroupUI
          style={{ marginTop: '5px' }}
          buttons={[{ title: t('StoryTitle'), onClick: titleClick }]}
        />
      )}

      {configFront.projectId && (
        <FrontModal
          onCloseDialog={onCloseDialog}
          open={openDialog}
          config={configFront}
          field={'Response'}
          title={t('StoryTitle')}
          isTSV={false}
        />
      )}
      <CardContent
        item={item}
        filters={filters}
        fontSize={fontSize}
        markdown={markdown}
        isLoading={Boolean(loading)}
        languageId={languageId}
        markdownView={markdownView}
      />
    </Card>
  );
}
