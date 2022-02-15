import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  option: {
    color: 'black',
  },

  formControl: {
    width: '100%',
  },

  icon: {
    color: theme.palette.secondary.main,
  },

  select: {
    color: theme.palette.secondary.main,
    fontSize: '0.875rem',
    fontWeight: '500',
  },
}));
