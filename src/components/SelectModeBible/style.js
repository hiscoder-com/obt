import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
    marginRight: theme.spacing(2),
  },

  icon: { color: 'inherit' },

  select: {
    fontSize: '0.875rem',
    fontWeight: '500',
  },
}));
