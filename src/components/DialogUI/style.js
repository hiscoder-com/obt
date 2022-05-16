import { makeStyles } from '@material-ui/core/styles';

const useLocalTitleStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    dragIndicator: 'draggable-dialog-title',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  buttons: {
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  draggable: {
    cursor: 'move',
  },
  undraggable: {
    cursor: 'default',
  },
}));

export default useLocalTitleStyles;
