import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 100,
  },
});

export default function TableMatches({ tableVerse, firstIndex, lastIndex, handleClick }) {
  const classes = useStyles();
  console.log(tableVerse);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          {tableVerse
            .map((row) => (
              <TableRow
                hover
                onClick={() => handleClick(row.keyChapter, row.keyVerse)}
                key={row.key}
              >
                <TableCell size={'small'}>
                  {row.keyChapter + ':' + row.keyVerse}
                </TableCell>
                <TableCell size={'small'}>{row.tokens}</TableCell>
              </TableRow>
            ))
            .slice(firstIndex, lastIndex)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
