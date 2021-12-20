import { useState, useEffect } from 'react';

import {
  useProskomma,
  useImport,
  useSearchForPassagesByBookCode,
} from 'proskomma-react-hooks';

import { useContent } from 'translation-helps-rcl/dist/hooks';
export default function useSearch({ resourceSearch, referenceSelected, searchText }) {
  const { chapter, bookId } = referenceSelected;
  const { languageId, name, owner } = resourceSearch;
  const [cvMatching, setCvMatching] = useState([]);
  const [matches, setMatches] = useState(null);
  const [verseObjects, setVerseObjects] = useState({});
  const [usfm, setUsfm] = useState(null);

  const content = useContent({
    chapter: chapter,
    projectId: bookId,
    branch: 'master',
    languageId: languageId,
    resourceId: name.split('_')[1],
    owner: owner,
    server: 'https://git.door43.org',
  });

  useEffect(() => {
    if (content) {
      setUsfm(content.markdown);
    }
  }, [content]);

  const docSetId = `${owner}/${name}`;
  const bookCode = bookId.toUpperCase();
  const verbose = true;
  const documents = [
    {
      selectors: {
        org: owner,
        lang: languageId,
        abbr: name.split('_')[1],
      },
      bookCode: bookId.toUpperCase(),
      data: usfm,
    },
  ];

  const { stateId, newStateId, proskomma } = useProskomma({
    verbose,
  });
  const { errors: importErrors } = useImport({
    proskomma,
    stateId,
    newStateId,
    documents,
    verbose,
  });
  console.log(importErrors);
  const {
    passages,

    data,
  } = useSearchForPassagesByBookCode({
    proskomma,
    stateId,
    text: searchText,
    docSetId,
    bookCode,
    // blocks: true,
    tokens: true,
  });

  useEffect(() => {
    setCvMatching(data?.docSet?.document?.cvMatching);
  }, [data]);
  useEffect(() => {
    setMatches(data?.docSet?.matches);
  }, [data]);

  useEffect(() => {
    let _verseObjects = {};

    cvMatching &&
      cvMatching.forEach((el, index) => {
        const keyChapter = el.scopeLabels[0].split('/')[1];
        const keyVerse = el.scopeLabels[1].split('/')[1];
        const key = index;
        const tok = el.tokens.map((e) => e.payload);

        const match = matches
          .filter((e) => tok.includes(e.matched))
          .map((e) => e.matched);
        const tokens = el.tokens;

        _verseObjects[key] = { keyChapter, keyVerse, match, tokens };
      });
    setVerseObjects(_verseObjects);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cvMatching]);

  return { passages, cvMatching, data, matches, verseObjects };
}
