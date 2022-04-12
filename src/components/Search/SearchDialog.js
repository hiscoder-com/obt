import React, { useState } from 'react';
import { useSearch, useFetchUsfm } from '@texttree/search-proskomma-rcl';

function SearchDialog() {
  const [startFetch, setStartFetch] = useState(false);
  const bookCodes = ['1ti', 'tit', 'rut'];
  const _bookCodes = startFetch ? bookCodes : [];
  const owner = 'ru_gl';
  const repo = 'ru_rlob';
  const server = 'git.door43.org';
  const _docSetId = `ru_gl/ru_rlob`;
  const _searchText = 'бог';

  const verbose = true;

  const { projects, usfms } = useFetchUsfm({
    owner,
    repo,
    server,
    bookCodes: _bookCodes,
  });
  const _documents = [
    {
      selectors: { org: 'ru_gl', lang: 'ru', abbr: 'rlob' },
      data: usfms && usfms['1ti'],
      bookCode: '1ti',
    },
    {
      selectors: { org: 'ru_gl', lang: 'ru', abbr: 'rlob' },
      data: usfms && usfms['tit'],
      bookCode: 'tit',
    },
    {
      selectors: { org: 'ru_gl', lang: 'ru', abbr: 'rlob' },
      data: usfms && usfms['rut'],
      bookCode: 'rut',
    },
  ];

  const [startImport, setStartImport] = useState(false);
  const [startSearch, setStartSearch] = useState(false);
  const [searchText, setSearchText] = useState(_searchText);
  const documents = startImport ? _documents : [];
  const docSetId = startSearch ? _docSetId : '';

  const { dataArray } = useSearch({ documents, searchText, docSetId, verbose });

  const tableMatches = (
    <table>
      {dataArray.length > 0 &&
        dataArray.map((el, i) => {
          const bookCode =
            el && el.docSet && el.docSet.document && el.docSet.document.bookCode;
          const length =
            el &&
            el.docSet &&
            el.docSet.document &&
            el.docSet.document.cvMatching.length + ' matches';
          const arr =
            el && el.docSet && el.docSet.document && el.docSet.document.cvMatching;
          return (
            <>
              <tr key={i}>
                <td>{bookCode}</td>
                <td>{length}</td>
                <td>
                  {arr &&
                    arr.map((element, index) => {
                      return (
                        <tr key={index}>
                          <td>{element.text.substr(0, 20) + '...'}</td>
                        </tr>
                      );
                    })}
                </td>
              </tr>
              <br />
            </>
          );
        })}
    </table>
  );

  return (
    <>
      <>
        <button onClick={() => setStartFetch(true)}>Fetch USFM</button>
        <div>Projects : {projects && projects.length}</div>
        <div>USFMs : {usfms && Object.keys(usfms).length}</div>
      </>
      <input
        onBlur={(e) => {
          setSearchText(e.target.value);
        }}
        defaultValue={searchText}
      />
      <button
        onClick={() => {
          setStartImport(true);
        }}
      >
        Import
      </button>
      <button
        onClick={() => {
          setStartSearch(true);
        }}
      >
        Search
      </button>
      {dataArray.length > 0 && tableMatches}
    </>
  );
}

export default SearchDialog;
