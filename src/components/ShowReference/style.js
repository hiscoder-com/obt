import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: '3px',
    display: 'flex',
  },
  showBook: {
    margin: '5px',
    cursor: 'pointer',
    '&:hover': {
      color: '#000',
    },
  },
  showChapter: {
    margin: '5px',
    cursor: 'pointer',
    '&:hover': {
      color: '#000',
    },
  },
}));
