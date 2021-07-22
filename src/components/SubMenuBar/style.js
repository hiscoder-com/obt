import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  grow: {
    justifyContent: 'space-between',
  },
  menu: {
    minWidth: '220px',
  },
  centerButtons: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

export const useModalStyles = makeStyles((theme) => ({
  paper: {
    boxShadow:
      '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12),0 1px 3px 0 rgba(0,0,0,0.14)',
  },
}));
