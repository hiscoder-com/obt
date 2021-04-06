import { makeStyles } from '@material-ui/core/styles';

// import  from './fonts/fonts.css;

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: 'Octava',
    flexGrow: '1',
  },
  appBar: {
    backgroundColor: 'black',
    height: '60px',
  },
  title: {
    lineHeight: '60px',
    marginLeft: '10px',

    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  toolBar: {
    margin: '3px',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1em',
    boxSizing: 'border-box',
  },
  a: {
    color: 'white',
    textDecoration: 'none',
  },
}));

export default useStyles;
