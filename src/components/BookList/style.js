import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  falseElement: {
    backgroundColor: 'transparent',
    border: 'none',
    fontFamily: 'arial, sant-serif',
    color: '#bbbbbb',
    fontWeight: 600,
    fontSize: 18,
  },
  bookWrap: {
    textAlign: 'center',
  },
  bookGrid: {
    columnGap: '25px',
    [theme.breakpoints.down('xs')]: {
      columnCount: 1,
    },
    [theme.breakpoints.only('sm')]: {
      columnCount: 2,
    },
    [theme.breakpoints.only('md')]: {
      columnCount: 3,
    },
    [theme.breakpoints.only('lg')]: {
      columnCount: 4,
    },
    [theme.breakpoints.up('xl')]: {
      columnCount: 5,
    },
  },
}));
