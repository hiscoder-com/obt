import { makeStyles } from '@material-ui/core';
export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    textAlign: 'center',
  },
  positionCenter: { textAlign: 'center' },
  buttonBlock: { display: 'flex', justifyContent: 'space-around' },
  backButton: {
    marginRight: theme.spacing(1),
  },
  myStepper: { padding: '20px 6px' },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  divider: { marginTop: theme.spacing(2), marginBottom: theme.spacing(2) },
}));
