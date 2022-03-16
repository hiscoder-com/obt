import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  formControl: {
    display: 'block',
    minWidth: '200px',
  },

  layoutName: {
    marginBottom: '10px',
    paddingBottom: '5px',
  },

  layout: {
    paddingBottom: '5px',
  },

  menuItem: {
    minWidth: '190px',
    // justifyContent: 'flex-end',
  },

  button: {
    marginLeft: '10px',
    marginTop: '10px',
  },

  fileCopyIcon: {
    // justifySelf: 'right',
    marginLeft: '10px',
    '&:hover': {
      color: 'blue',
    },
  },

  deleteIcon: {
    marginLeft: 'auto',
    '&:hover': {
      color: 'brown',
    },
  },

  // test: {
  //   height: '55px',
  // },
}));
