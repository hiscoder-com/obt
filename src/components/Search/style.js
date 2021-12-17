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
  tableMatches: {
    marginTop: '10px',
  },
  pagination: {
    paddingTop: '10px',
    flexGrow: '1',
    margin: '0 auto',
  },
  wrapperMatchesBlock: {
    display: 'flex',
    flexDirection: 'column',
    height: '300px',
  },
  matchesResultString: {
    fontWeight: 'bold',
    marginTop: '10px',
  },
}));

export default useStyles;
