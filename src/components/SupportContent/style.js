import { makeStyles } from '@material-ui/core/styles';

export const useCircularStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(3),
  },
}));
export const useNoContentStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4, 0),
    fontWeight: 'bold',
    height: '100%',
    fontSize: '1.3rem',
  },
}));
export default useCircularStyles;
