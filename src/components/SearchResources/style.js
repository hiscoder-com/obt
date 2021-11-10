import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  divider: { backgroundColor: '#ccc', margin: theme.spacing(1), padding: '5px 10px' },
  menu: { whiteSpace: 'break-spaces' },
}));
export const useAddStyles = makeStyles((theme) => ({
  root: {
    color: '#333333',
    borderColor: '#38addf',
    '&:hover': {
      color: '#333333',
      borderColor: '#38addf',
    },
    '&:active': {
      color: '#333333',
      borderColor: '#38addf',
    },
    '&:focus': {
      color: '#333333',
      borderColor: '#38addf',
    },
  },
}));
