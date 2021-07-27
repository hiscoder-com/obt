import { getBookChapters } from '@texttree/tt-reference-rcl';

export const nextChapter = (referenceSelected, setReferenceSelected) => {
  let chapterNumber = parseInt(referenceSelected.chapter);
  const chapters = Object.keys(getBookChapters(referenceSelected.bookId));
  if (chapterNumber !== chapters.length) {
    chapterNumber++;
    setReferenceSelected({
      ...referenceSelected,
      chapter: String(chapterNumber),
      verse: 1,
    });
  }
};
export const previousChapter = (referenceSelected, setReferenceSelected) => {
  let chapterNumber = parseInt(referenceSelected.chapter);
  if (chapterNumber !== 1) {
    chapterNumber--;
    setReferenceSelected({
      ...referenceSelected,
      chapter: String(chapterNumber),
      verse: 1,
    });
  }
};
