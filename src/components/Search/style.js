import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    textAlign: 'center',
    height: '500px',
  },
  formControl: {
    marginRight: '10px',
  },

  searchIcon: {
    fontSize: 20,
  },
  searchButton: {
    display: 'flex',
  },
  inputRoot: {
    color: 'inherit',
  },
  divider: {
    marginTop: '10px',
  },
}));

export default useStyles;
