import { useState, useEffect } from 'react';

import { useProskomma, useImport, useSearchForPassages } from 'proskomma-react-hooks';
import axios from 'axios';

export default function useSearch({
  languageId,
  name,
  owner,
  bookId,
  chapter,
  searchText,
  usfm,
}) {
  const [bookData, setBookData] = useState({});
  const [cvMatching, setCvMatching] = useState([]);
  const [matches, setMatches] = useState([]);
  const [verseObjects, setVerseObjects] = useState({});
  const searchT = 'благо';

  async function getBookText() {
    const response = await axios.get(
      `https://git.door43.org/${owner}/${name}/raw/branch/master/57-TIT.usfm`
    );
    return response.data;
  }

  useEffect(() => {
    getBookText().then((bookData) => {
      setBookData(bookData);
    });
  }, []);

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
      data: bookData,
    },
  ];

  const {
    stateId,
    newStateId,
    proskomma,
    errors: proskommaErrors,
  } = useProskomma({
    verbose,
  });
  const { errors: importErrors } = useImport({
    proskomma,
    stateId,
    newStateId,
    documents,
    verbose,
  });

  const {
    stateId: searchStateId,
    query,
    passages,
    errors: searchErrors,
    data,
  } = useSearchForPassages({
    proskomma,
    stateId,
    text: searchT,
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
    console.log(cvMatching);
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
  }, [cvMatching]);

  return { passages, cvMatching, data, matches, verseObjects };
}
