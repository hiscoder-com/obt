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
    alignItems: 'center',
  },
  reference: {
    margin: theme.spacing(1),
    display: 'flex',
    borderRadius: 6,
    fontWeight: 'bold',
    fontSize: '1.4em',
  },
}));

export const useModalStyles = makeStyles((theme) => ({
  paper: {
    boxShadow:
      '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12),0 1px 3px 0 rgba(0,0,0,0.14)',
  },
}));
