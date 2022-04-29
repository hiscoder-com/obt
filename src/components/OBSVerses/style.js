import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  circular: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(3),
  },
  sup: {
    marginRight: theme.spacing(1 / 2),
  },
}));

export default useStyles;
