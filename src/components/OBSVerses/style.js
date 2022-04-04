import { makeStyles } from '@material-ui/core/styles';

export const useCircularStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(3),
  },
}));

export default useCircularStyles;
