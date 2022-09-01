import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  link: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
    display: 'inline-block',
    '&:hover': { textDecoration: 'underline' },
  },
}));

export default useStyles;
