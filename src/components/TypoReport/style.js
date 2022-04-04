import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  errorMessage: {
    color: 'red',
  },
  ref: {
    textAlign: 'right',
    fontWeight: 'bold',
  },
  finishDialogContent: {
    textAlign: 'center',
  },
}));

export default useStyles;
