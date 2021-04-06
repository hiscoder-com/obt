import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    minWidth: 20,
    color: 'white',
  },
  icon: {
    color: 'white',
  },
  option: {
    color: 'black',
  },
}));

export default useStyles;
