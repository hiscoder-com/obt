import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  linkContainer: {
    cursor: 'pointer',
    padding: theme.spacing(1 / 2, 2),
    display: 'block',
  },
}));
export default useStyles;
