import React, { useContext } from 'react';

import DialogUI from '../DialogUI/DialogUI';
import { AppContext } from '../../context';
import BibleVerseDisplay from './BibleVerseDisplay';
const BibleVerseDisplayDialog = ({ onClose }) => {
  const {
    state: { showBibleVerse },
    actions: { setShowBibleVerse },
  } = useContext(AppContext);

  const handleCancel = () => {
    setShowBibleVerse(false);
  };

  return (
    <DialogUI
      primary={{
        text: 'Закрыть',
        onClick: onClose,
      }}
      maxWidth="lg"
      open={showBibleVerse}
      onClose={handleCancel}
      title="Отображение стиха с настройками"
    >
      <BibleVerseDisplay />
    </DialogUI>
  );
};

export default BibleVerseDisplayDialog;
