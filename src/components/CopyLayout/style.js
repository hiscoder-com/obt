import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  menuItemLayoutList: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  elementNameLayoutList: {
    whiteSpace: 'normal',
    maxWidth: theme.spacing(52),
  },

  copyIcon: {
    marginLeft: theme.spacing(2),
    '&:hover': {
      color: theme.palette.info.main,
    },
  },

  deleteIcon: {
    '&:hover': {
      color: theme.palette.error.main,
    },
  },

  select: {
    width: theme.spacing(27),
  },
}));
