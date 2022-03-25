import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  menuItemLayoutList: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  elementNameLayoutList: {
    whiteSpace: 'normal',
    maxWidth: '420px',
  },

  copyIcon: {
    marginLeft: '10px',
    '&:hover': {
      color: theme.palette.buttonCopy.main,
    },
  },

  deleteIcon: {
    '&:hover': {
      color: theme.palette.buttonDelete.main,
    },
  },

  select: {
    width: '210px',
  },

  addButton: {
    display: 'flex',
    justifyContent: 'center',
  },
}));
