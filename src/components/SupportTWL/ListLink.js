import React, { useContext, useMemo } from 'react';

import { Link } from '@material-ui/core';

import { ReferenceContext } from '../../context';

import useStyles from './style';

function ListLink({ links, setAnchorEl }) {
  const classes = useStyles();
  const {
    state: { referenceSelected },
    actions: { goToBookChapterVerse },
  } = useContext(ReferenceContext);

  const currentReference = (reference) => {
    return (
      reference[0] + ':' + reference[1] ===
      referenceSelected.chapter + ':' + referenceSelected.verse
    );
  };
  const handleClick = (reference) => {
    goToBookChapterVerse(referenceSelected.bookId, reference[0], reference[1]);
    setAnchorEl(null);
  };
  const listReference = useMemo(
    () =>
      links.map((el, index) => {
        const reference = el.split(':');
        return (
          <div key={index} className={classes.linkContainer}>
            <Link
              onClick={() => handleClick(reference)}
              color={currentReference(reference) ? 'textSecondary' : 'primary'}
              disabled={currentReference(reference)}
            >
              {el}
            </Link>
          </div>
        );
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [links]
  );
  return <>{listReference}</>;
}

export default ListLink;
