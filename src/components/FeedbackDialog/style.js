import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  textfield: { margin: theme.spacing(1) },
  nameTextfield: { margin: theme.spacing(1), maxWidth: '300px' },
  container: { display: 'flex', flexDirection: 'column' },
  link: { textDecoration: 'underline' },
}));
