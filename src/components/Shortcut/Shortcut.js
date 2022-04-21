import { useContext } from 'react';

import { useHotkeys } from 'react-hotkeys-hook';

import { AppContext, ReferenceContext } from '../../context';

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
  const {
    actions: { setSwitchObsImage },
  } = useContext(AppContext);

  useHotkeys(
    'ctrl+right',
    (e) => {
      goToNextChapter();
      e.cancelBubble = true;
      e.preventDefault();
      e.stopImmediatePropagation();
    },
    {},
    [referenceSelected]
  );
  useHotkeys(
    'ctrl+left',
    (e) => {
      goToPrevChapter();
      e.cancelBubble = true;
      e.preventDefault();
      e.stopImmediatePropagation();
    },
    {},
    [referenceSelected]
  );
  useHotkeys(
    'ctrl+shift+left',
    (e) => {
      goToPrevBook();
      e.cancelBubble = true;
      e.preventDefault();
      e.stopImmediatePropagation();
    },
    {},
    [referenceSelected]
  );
  useHotkeys(
    'ctrl+shift+right',
    (e) => {
      goToNextBook();
      e.cancelBubble = true;
      e.preventDefault();
      e.stopImmediatePropagation();
    },
    {},
    [referenceSelected]
  );
  useHotkeys(
    'ctrl+up',
    (e) => {
      goToPrevVerse();
      e.cancelBubble = true;
      e.preventDefault();
      e.stopImmediatePropagation();
    },
    {},
    [referenceSelected]
  );
  useHotkeys(
    'ctrl+down',
    (e) => {
      goToNextVerse();
      e.cancelBubble = true;
      e.preventDefault();
      e.stopImmediatePropagation();
    },
    {},
    [referenceSelected]
  );

  useHotkeys(
    'ctrl+shift+l',
    (e) => {
      localStorage.clear();
      e.cancelBubble = true;
      e.preventDefault();
      e.stopImmediatePropagation();
    },
    {},
    []
  );
  useHotkeys(
    'alt+o',
    (e) => {
      setSwitchObsImage((prev) => !prev);
      e.cancelBubble = true;
      e.preventDefault();
      e.stopImmediatePropagation();
    },
    {},
    []
  );

  return Shortcut;
}
