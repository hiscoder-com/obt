import { useContext } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { ReferenceContext } from '../context/ReferenceContext';

export default function Shortcut() {
  const {
    state: { referenceSelected },
    actions: {
      goToNextChapter,
      goToPrevChapter,
      goToPrevVerse,
      goToNextVerse,
      goToPrevBook,
      goToNextBook,
    },
  } = useContext(ReferenceContext);

  useHotkeys('ctrl+right', () => goToNextChapter(), {}, [referenceSelected]);
  useHotkeys('ctrl+left', () => goToPrevChapter(), {}, [referenceSelected]);
  useHotkeys('ctrl+shift+left', () => goToPrevBook(), {}, [referenceSelected]);
  useHotkeys('ctrl+shift+right', () => goToNextBook(), {}, [referenceSelected]);
  useHotkeys('ctrl+up', () => goToPrevVerse(), {}, [referenceSelected]);
  useHotkeys('ctrl+down', () => goToNextVerse(), {}, [referenceSelected]);
  return Shortcut;
}
