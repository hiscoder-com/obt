import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import LaunchIcon from '@material-ui/icons/Launch';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  table: {
    minWidth: 100,
  },
});

export default function TableMatches({ tableVerse, firstIndex, lastIndex, handleClick }) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          {tableVerse
            .map((row) => (
              <TableRow key={row.key}>
                <TableCell size={'small'}>
                  {t(row.bookId + '_abbr').toUpperCase()}
                </TableCell>
                <TableCell size={'small'}>
                  {row.keyChapter + ':' + row.keyVerse}
                </TableCell>
                <TableCell size={'small'}>{row.tokens}</TableCell>
                <TableCell size={'small'}>
                  <LaunchIcon
                    onClick={() => handleClick(row.keyChapter, row.keyVerse)}
                    style={{ cursor: 'pointer', fontSize: 20 }}
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
