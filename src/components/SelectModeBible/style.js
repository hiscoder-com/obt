import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  option: {
    color: 'black',

  },
  formControl: {
    width: '100%',
  },

  icon: {
    color: 'white',
  },
  select: {
    paddingBottom:'12px',
    color: 'white',
    fontSize: '0.875rem',
    fontFamily: ["Roboto", "Helvetica", "Arial", 'sansSerif'],
    fontWeight: '500',
    lineHeight: "1.75",
    letterSpacing: "0.02857em",
   
  },
}));
