import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  formControl: {
    display: 'block',
    marginRight: theme.spacing(2),
  },

  layoutName: {
    marginBottom: '10px',
  },

  select: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  deleteIcon: {
    '&:hover': {
      color: 'red',
    },
  },
}));
