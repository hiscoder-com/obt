import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import SelectLanguage from './SelectLanguage';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: '1',
  },
  appBar: {
    backgroundColor: '#2c2c2c',
    height: '60px',
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  menu: {
    widht: '300px',
    marginLeft: '40px',
    display: 'flex',
    flexGrow: 1,
  },
  menuItem: {
    margin: '30px',
    fontSize: '15px',
    marginLeft: '100',
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },

    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const MenuItems = [
  { title: 'Bible' },
  { title: 'OBS' },
  { title: 'Bible in your language' },
];

export default function MenuBar() {
  const classes = useStyles();
  const Menu = MenuItems.map((MenuItems, index) => (
    <Typography className={classes.menuItem} variant="h6" noWrap key={index}>
      {MenuItems.title}
    </Typography>
  ));

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            ROB Resources
          </Typography>
          <div className={classes.menu}>{Menu}</div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder=""
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <SelectLanguage />
        </Toolbar>
      </AppBar>
    </div>
  );
}
