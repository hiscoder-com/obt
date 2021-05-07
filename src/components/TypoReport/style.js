import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: '10px',
  },
  title: {
    '& h2': {
      fontWeight: 'bold',
      fontSize: 24,
    },
  },
  actions: {
    padding: theme.spacing(2),
  },
  cancel: {},
  secondActions: {
    margin: '0 auto',
  },
  center: {
    textAlign: 'center',
  },
  send: {
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default useStyles;
