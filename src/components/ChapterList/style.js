import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  chapterList: {
    margin: theme.spacing(1),
    columnGap: '25px',
    [theme.breakpoints.down('xs')]: {
      columnCount: 2,
    },
    [theme.breakpoints.only('sm')]: {
      columnCount: 3,
    },
    [theme.breakpoints.only('md')]: {
      columnCount: 5,
    },
    [theme.breakpoints.only('lg')]: {
      columnCount: 7,
    },
    [theme.breakpoints.up('xl')]: {
      columnCount: 8,
    },
  },
}));


export const useButtonStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minWidth: 'inherit',
  },
}));

export default useStyles;
