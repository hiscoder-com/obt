import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  linkContainer: {
    padding: theme.spacing(1 / 2, 2),
  },
  twl: {
    color: theme.palette.text.disabled,
  },
}));
export default useStyles;
