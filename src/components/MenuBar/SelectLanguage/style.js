import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  nativeSelect: {
    margin: theme.spacing(1),
    minWidth: 120,
    color: 'white',
  },
  optionStyle: {
    color: 'black',
  },
}));

export default useStyles;
