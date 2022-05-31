import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  option: {
    color: 'black',
  },
  formControl: {
    width: '100%',
  },
  select: {
    marginTop: theme.spacing(3) + 'px !important',
  },
}));
