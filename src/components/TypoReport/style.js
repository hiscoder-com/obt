import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    padding: 5,
  },
  select: {
    color: 'red',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default useStyles;
