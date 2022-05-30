import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  select: { maxWidth: '100%', marginBottom: theme.spacing(2) },
  boxWrap: {
    marginBottom: theme.spacing(2),
    width: '320px',
    height: '180px',
    background: theme.palette.background.default,
    border: '1px solid #ccc',
  },
  iframeWrap: {
    width: '100%',
    height: '100%',
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iframe: {
    border: 'none',
    background: theme.palette.background.paper,
  },
  fontWrap: {
    marginTop: theme.spacing(1),
    width: '300px',
    marginBottom: theme.spacing(2),
  },
  settingsWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 0,
    position: 'relative',
  },
}));

export default useStyles;
