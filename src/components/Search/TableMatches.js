import React from 'react';

import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core';

import LaunchIcon from '@material-ui/icons/Launch';

import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  table: {
    minWidth: 100,
  },
  launchIcon: {
    cursor: 'pointer',
    fontSize: 20,
  },
});

export default function TableMatches({
  tableVerse,
  firstIndex,
  lastIndex,
  handleClickVerse,
}) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          {tableVerse
            .map((row) => (
              <TableRow key={row.key}>
                <TableCell key={row.key} size={'small'}>
                  {t(row.bookId + '_abbr').toUpperCase()}
                </TableCell>
                <TableCell key={row.key} size={'small'}>
                  {row.keyChapter + ':' + row.keyVerse}
                </TableCell>
                <TableCell key={row.key} size={'small'}>
                  {row.tokens}
                </TableCell>
                <TableCell key={row.key} size={'small'}>
                  <LaunchIcon
                    key={row.key}
                    onClick={() => handleClickVerse(row.keyChapter, row.keyVerse)}
                    className={classes.launchIcon}
                  />
                </TableCell>
              </TableRow>
            ))
            .slice(firstIndex, lastIndex)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
