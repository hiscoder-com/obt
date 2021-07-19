import { useContext } from 'react';

import { getBookChapters } from '@texttree/tt-reference-rcl';
import { AppContext } from './App.context';

export default function Shortcut() {
  const {
    state: { referenceSelected },
    actions: { setReferenceSelected },
  } = useContext(AppContext);

  document.onkeyup = (event) => {
    let chapterNumber = parseInt(referenceSelected.chapter);
    if (event.code === 'ArrowRight' && event.ctrlKey) {
      const chapters = Object.keys(getBookChapters(referenceSelected.bookId));
      if (chapterNumber === chapters.length) {
        //  ничего не делать
      } else if (chapterNumber !== chapters.length) {
        chapterNumber++;
        setReferenceSelected({
          ...referenceSelected,
          chapter: String(chapterNumber),
          verse: 1,
        });
      }
    } else if (event.code === 'ArrowLeft' && event.ctrlKey) {
      if (chapterNumber === 1) {
      } else {
        if (chapterNumber === 1) {
        } else {
          chapterNumber--;
          setReferenceSelected({
            ...referenceSelected,
            chapter: String(chapterNumber),
            verse: 1,
          });
        }
      }
    }
  };
  return Shortcut;
}
