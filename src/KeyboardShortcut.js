import { useContext } from 'react';
import { getBookChapters } from '@texttree/tt-reference-rcl';
import { AppContext } from './App.context';

export default function Shortcut() {
  const { state, actions } = useContext(AppContext);
  const { referenceSelected } = state;
  const { setReferenceSelected } = actions;

  document.onkeyup = (event) => {
    let chapterNumber = parseInt(referenceSelected.chapter);
    let Chapters = Object.keys(getBookChapters(referenceSelected.bookId));
    if (event.code === 'ArrowRight' && event.ctrlKey) {
      if (chapterNumber !== Chapters.length) {
        chapterNumber++;
        setReferenceSelected({
          ...referenceSelected,
          chapter: String(chapterNumber),
          verse: 1,
        });
      } else {
        chapterNumber = Chapters.length;
      }
    } else if (event.code === 'ArrowLeft' && event.ctrlKey) {
      if (chapterNumber === 1) {
        console.log(Chapters[0]);
        chapterNumber = 1;
      } else {
        console.log(Chapters[0]);
        chapterNumber--;
        setReferenceSelected({
          ...referenceSelected,
          chapter: String(chapterNumber),
          verse: 1,
        });
      }
    }
  };
  return Shortcut;
}
