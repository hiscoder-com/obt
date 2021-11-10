import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(0),
    },
  },
}));

export const useButtonStyles = makeStyles((theme) => ({
  root: {
    textTransform: 'none',
  },
}));

export default useStyles;
