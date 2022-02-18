import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
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
      backgroundColor: `${theme.palette.background.paper} !important`,
    },
    title: {
      color: `${theme.palette.cardHeaderText.main} !important`,
    },
    header: {
      background: theme.palette.cardHeaderBg.main,
      padding: '4px',
      color: `${theme.palette.cardHeaderText.main} !important`,
    },
    children: {
      marginTop: '6px',
      lineHeight: '1.25',
    },
    dragIndicator: {
      marginRight: '4px',
      color: theme.palette.cardHeaderText.main,
    },
  };
});

export default useStyles;
