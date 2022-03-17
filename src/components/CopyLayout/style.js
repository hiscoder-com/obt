import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  formControl: {
    display: 'block',
    minWidth: '200px',
    maxWidth: '400px',
  },

  layoutName: {
    marginBottom: '10px',
    paddingBottom: '5px',
  },

  layout: {
    paddingBottom: '5px',
  },

  menuItem: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  button: {
    marginLeft: '14px',
    marginTop: '12px',
  },

  elementName: {
    whiteSpace: 'normal',
    maxWidth: '400px',
  },

  fileCopyIcon: {
    marginLeft: '10px',
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
