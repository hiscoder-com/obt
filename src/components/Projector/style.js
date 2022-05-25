import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  wrap: {
    display: 'flex',
    textAlign: 'center',
    height: 'calc(100vh - 40px)',
    background: '#fdf5ea',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: '20px',
    borderColor: '#ffb732',
    color: '#023047',
    borderStyle: 'solid',
  },
  content: {
    padding: '40px',
    overflowY: 'auto',
    height: '100%',
    '&>p': {
      marginTop: 0,
    },
    '&>h1': {
      marginTop: 0,
    },
    '&>h3': {
      marginTop: 0,
    },
    '&>h2': {
      marginTop: 0,
    },
  },
  bottomLine: {
    marginBottom: '40px',
    background: '#ffb732',
    width: '100%',
    fontWeight: 'bold',
  },
  resource: {
    fontSize: '.4em',
    color: '#fdf5ea',
  },
}));

export default useStyles;
