import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  formControl: {
    display: 'block',
    marginRight: theme.spacing(2),
  },

  layoutName: {
    marginBottom: '10px',
    paddingBottom: '5px',
  },

  layout: {
    paddingBottom: '5px',
  },

  select: {
    display: 'flex',
    minWidth: 190,
    justifyContent: 'space-between',
  },

  button: {
    marginLeft: '10px',
    marginTop: '10px',
  },

  fileCopyIcon: {
    '&:hover': {
      color: 'blue',
    },
  },

  deleteIcon: {
    '&:hover': {
      color: 'brown',
    },
  },
}));
