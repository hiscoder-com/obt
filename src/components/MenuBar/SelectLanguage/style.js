import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 60,
    float: 'right',
  },
  nativeSelect: {
    margin: theme.spacing(1),
    minWidth: 20,
    color: 'white',
  },
  optionStyle: {
    color: 'black',
  },
}));

export default useStyles;
