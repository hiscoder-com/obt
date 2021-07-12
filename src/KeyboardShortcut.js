import { useContext } from 'react';
import { getBookChapters, getAllChapters } from '@texttree/tt-reference-rcl';
import { AppContext } from './App.context';

export default function Shortcut() {
  const { state, actions } = useContext(AppContext);
  const { referenceSelected } = state;
  const { setReferenceSelected } = actions;

  document.onkeyup = (event) => {
    let chapterNumber = parseInt(referenceSelected.chapter);
    let chapters = Object.keys(getBookChapters(referenceSelected.bookId));
    let allBooks = Object.keys(getAllChapters());
    let openBook = allBooks.indexOf(referenceSelected.bookId);
    let pastBookIndex = openBook - 1;
    let nextBookIndex = openBook + 1;
    let pastBook = allBooks[pastBookIndex];
    let nextBook = allBooks[nextBookIndex];
    let pastChapters = Object.keys(getBookChapters(pastBook));

    if (event.code === 'ArrowRight' && event.ctrlKey) {
      if (referenceSelected.bookId === 'obs' && chapterNumber === chapters.length) {
        setReferenceSelected({
          ...referenceSelected,
          chapter: String(chapters.length),
          verse: 1,
        });
      } else if (referenceSelected.bookId === 'obs') {
        chapterNumber++;
        setReferenceSelected({
          ...referenceSelected,
          chapter: String(chapterNumber),
          verse: 1,
        });
      }
      if (referenceSelected.bookId === 'rev' && chapterNumber === chapters.length) {
        setReferenceSelected({
          bookId: 'rev',
          chapter: String(chapters.length),
          verse: 1,
        });
      } else if (
        chapterNumber !== chapters.length &&
        referenceSelected.bookId !== 'obs'
      ) {
        chapterNumber++;
        setReferenceSelected({
          ...referenceSelected,
          chapter: String(chapterNumber),
          verse: 1,
        });
      } else if (referenceSelected.bookId !== 'obs') {
        setReferenceSelected({
          bookId: nextBook,
          chapter: '1',
          verse: 1,
        });
      }
    } else if (event.code === 'ArrowLeft' && event.ctrlKey) {
      if (
        (referenceSelected.bookId === 'gen' && chapterNumber === 1) ||
        (referenceSelected.bookId === 'obs' && chapterNumber === 1)
      ) {
        setReferenceSelected({
          ...referenceSelected,
          chapter: '1',
          verse: 1,
        });
      } else {
        if (chapterNumber === 1) {
          setReferenceSelected({
            bookId: pastBook,
            chapter: String(pastChapters.length),
            verse: 1,
          });
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
