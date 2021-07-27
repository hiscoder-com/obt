import { useContext } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { AppContext } from '../App.context';
import { nextChapter, previousChapter } from './functions';

export default function useShortcut() {
  const {
    state: { referenceSelected },
    actions: { setReferenceSelected },
  } = useContext(AppContext);

  useHotkeys(
    'ctrl+right',
    () => nextChapter(referenceSelected, setReferenceSelected),
    {},
    [referenceSelected, setReferenceSelected]
  );
  useHotkeys(
    'ctrl+left',
    () => previousChapter(referenceSelected, setReferenceSelected),
    {},
    [referenceSelected, setReferenceSelected]
  );
  return useShortcut;
}
