import { useContext } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { AppContext } from '../App.context';

export default function Shortcut() {
  const {
    state: { referenceSelected },
    actions: { goToNextChapter, goToPrevChapter, goToPrevBook, goToNextBook },
  } = useContext(AppContext);

  useHotkeys('ctrl+right', () => goToNextChapter(), {}, [referenceSelected]);
  useHotkeys('ctrl+left', () => goToPrevChapter(), {}, [referenceSelected]);
  useHotkeys('ctrl+shift+left', () => goToPrevBook(), {}, [referenceSelected]);
  useHotkeys('ctrl+shift+right', () => goToNextBook(), {}, [referenceSelected]);
  return Shortcut;
}
