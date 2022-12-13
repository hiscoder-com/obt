import React, { useEffect } from 'react';

import { ReferenceUtils } from 'bible-reference-rcl';
import { Card, useContent, useCardState } from 'translation-helps-rcl';
import { useTranslation } from 'react-i18next';

import { ButtonGroupUI, FrontModal, SupportContent } from '../../components';

export default function SupportOBSSQ({
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
    ref: resource.ref ?? 'master',
    languageId: resource.languageId ?? 'en',
    resourceId: 'obs-sq',
    verse,
    chapter,
    owner: resource.owner ?? 'unfoldingword',
    server,
  };

  const { markdown, items, resourceStatus } = useContent(config);

  const {
    state: { item, headers, filters, itemIndex },
    actions: { setFilters, setItemIndex },
  } = useCardState({
    items,
  });

  const onSummaryClick = () => {
    const lastVerse = ReferenceUtils.getVerseList('obs', chapter).pop().key;
    setConfigFront({ ...config, verse: '1-' + lastVerse, chapter });
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
      disableSettingsButton
      title={title}
      onClose={() => onClose(true)}
      classes={{ ...classes, children: 'tqcard' }}
      id={type}
      items={items}
      headers={headers}
      filters={filters}
      fontSize={fontSize}
      itemIndex={itemIndex}
      setFilters={setFilters}
      setItemIndex={setItemIndex}
      showSaveChangesPrompt={() => {
        return new Promise((resolve, reject) => {
          resolve();
        });
      }}
    >
      {items && (
        <ButtonGroupUI
          buttonGroupProps={{ size: 'small', color: 'primary' }}
          style={{ marginTop: '10px' }}
          buttons={[{ title: t('Summary'), onClick: onSummaryClick }]}
        />
      )}

      {configFront.projectId && (
        <FrontModal
          onCloseDialog={onCloseDialog}
          open={openDialog}
          config={configFront}
          field={'Response'}
          title={t('Summary')}
        />
      )}
      <SupportContent
        config={config}
        item={item}
        resourceStatus={resourceStatus}
        fontSize={fontSize}
        markdown={markdown}
      />
    </Card>
  );
}
