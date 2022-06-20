import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  background: {
    background: '#ebecf0',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  root: { maxWidth: '560px' },
  select: { width: '300px' },
}));
