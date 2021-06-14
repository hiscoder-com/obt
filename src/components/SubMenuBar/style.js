import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  grow: {
    justifyContent: 'space-between',
  },
  report: {
    position: 'absolute',
    right: theme.spacing(10),
  },
  centerButtons: {
    display: 'flex',
    flexDirection: 'row',
  },
  input: {
    width: '100%',
  },
}));

export default useStyles;
