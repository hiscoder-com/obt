import React, { useContext, useMemo } from 'react';

import { Link } from '@material-ui/core';

import { ReferenceContext } from '../../context';

import useStyles from './style';

function ListLinks({ links, onClose }) {
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
    onClose();
  };
  const listReference = useMemo(
    () =>
      links &&
      links.length > 0 &&
      links.map((el, index) => {
        const reference = el.split(':');
        return (
          <Link
            key={index}
            className={classes.linkContainer}
            onClick={() => reference && handleClick(reference)}
            color={currentReference(reference) ? 'textSecondary' : 'primary'}
            disabled={currentReference(reference)}
          >
            {el}
          </Link>
        );
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [links]
  );
  return <>{listReference}</>;
}

export default ListLinks;
