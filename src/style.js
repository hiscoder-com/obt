import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
  console.log(theme.palette.primary.main);
  return {
    root: {
      padding: '6px !important',
      margin: '0 1px !important',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '8px !important',
      borderBottomRightRadius: '0px !important',
      overflow: 'hidden',
      backgroundColor: `${theme.palette.bgcolor.main} !important`,
    },
    title: {
      color: `${theme.palette.subcolor.main} !important`,
    },
    header: {
      background: theme.palette.secondary.main,
      padding: '4px',
      color: `${theme.palette.subcolor.main} !important`,
    },
    children: {
      marginTop: '6px',
      lineeHeight: '1.25',
    },
    dragIndicator: {
      marginRight: '4px',
      color: theme.palette.subcolor.main,
    },
  };
});

export default useStyles;
