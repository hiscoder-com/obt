import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  divider: {
    backgroundColor: theme.palette.background.default,
    margin: theme.spacing(1),
    padding: theme.spacing(1, 2),
  },
  menu: { whiteSpace: 'break-spaces' },
  link: {
    marginTop: theme.spacing(5),
    cursor: 'pointer',
    color: 'gray',
    textDecoration: 'underline',
  },
}));
