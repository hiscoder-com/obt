import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      padding: theme.spacing(1, '!important'),
      margin: theme.spacing(0, 1 / 8, '!important'),
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: theme.spacing(1, '!important'),
      borderBottomRightRadius: theme.spacing(0, '!important'),
      overflow: 'hidden',
      backgroundColor: `${theme.palette.background.paper} !important`,
      cursor: 'auto',
    },
    title: {
      color: `${theme.palette.cardHeaderText.main} !important`,
    },
    header: {
      background: theme.palette.cardHeaderBg.main,
      padding: theme.spacing(1 / 2),
      color: `${theme.palette.cardHeaderText.main} !important`,
    },
    children: {
      marginTop: theme.spacing(1),
      lineHeight: '1.25',
    },
    dragIndicator: {
      marginRight: theme.spacing(1 / 2),
      color: theme.palette.cardHeaderText.main,
    },
  };
});

export default useStyles;
