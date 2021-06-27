import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  grow: {
    justifyContent: 'space-between',
  },
  menu: {
    minWidth: '220px',
  },
  centerButtons: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

export default useStyles;
