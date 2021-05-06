import { makeStyles } from '@material-ui/core/styles';
const useBookStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    background: theme.palette.primary.main,
    borderRadius: 6,
    color: 'white',
    border: '1px solid #fff',
    boxShadow:
      '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
  },
  textPrimary: {
    '&:hover': {
      boxShadow:
        '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
      backgroundColor: theme.palette.primary.dark,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
}));
export default useBookStyles;
