import { makeStyles } from '@material-ui/core/styles';

export const useSelectStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    minWidth: 20,
    color: 'black',
  },
  icon: {
    color: 'black',
  },
}));

export const useStyles = makeStyles((theme) => ({
  option: {
    color: 'black',
  },
}));
