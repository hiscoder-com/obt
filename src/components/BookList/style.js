import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  bookList: {
    margin: theme.spacing(1),
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

export const useBookStyles = makeStyles(() => ({
  root: {
    margin: '0 auto',
    display: 'flex',
  },
}));
