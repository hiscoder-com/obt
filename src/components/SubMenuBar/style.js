import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  grow: {
    justifyContent: 'space-between',
  },
  menu: {
    whiteSpace: 'break-spaces',
  },
  centerButtons: {
    display: 'flex',
    flexDirection: 'row',
  },
  reference: {
    margin: theme.spacing(1),
    display: 'flex',
    borderRadius: 6,
    color: 'white',
  },
}));

export const useModalStyles = makeStyles((theme) => ({
  paper: {
    boxShadow:
      '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12),0 1px 3px 0 rgba(0,0,0,0.14)',
  },
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
