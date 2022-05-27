import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  wrap: {
    display: 'flex',
    textAlign: 'center',
    minHeight: 'calc(100vh - 180px)',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: '140px',
    justifyContent: 'space-between',
    background: '#fdf5ea',
    border: '20px solid #ffb732',
    color: '#023047',
  },
  topLine: {
    borderTop: '20px solid #ffb732',
    position: 'fixed',
    top: 0,
    width: '100%',
  },
  content: {
    padding: '40px',
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    justifyContent: 'center',
    '&>p': {
      margin: '6px',
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
  bottomBlock: {
    position: 'fixed',
    bottom: 0,
    paddingBottom: '40px',
    width: 'calc(100% - 40px)',
    fontWeight: 'bold',
    background: '#fdf5ea',
    border: '20px solid #ffb732',
    borderTop: '0px',
  },
  bottomLine: {
    height: '100px',
    fontSize: '50px',
    fontWeight: 'bold',
    background: '#ffb732',
  },
  topArrow: {
    position: 'fixed',
    top: '40px',
    right: '30px',
    opacity: 0.3,
  },
  bottomArrow: {
    position: 'fixed',
    bottom: '180px',
    right: '30px',
    opacity: 0.3,
  },
  bottom: {
    position: 'relative',
    bottom: '-120px',
  },
  top: {
    position: 'relative',
    top: '30px',
  },
  reference: {
    fontSize: '50px',
  },
  resource: {
    fontSize: '25px',
    color: '#fdf5ea',
  },
}));

export default useStyles;
