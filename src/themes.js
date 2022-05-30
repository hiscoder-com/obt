import { createTheme } from '@material-ui/core/styles';

const preDefault = {
  overrides: {
    current: {
      color: '#ff0000',
    },
    MuiAppBar: {
      colorInherit: {
        backgroundColor: '#3f51b5',
        color: '#ffffff',
      },
    },
    MuiInputBase: {
      root: {
        color: 'inherit',
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: '36px',
      },
    },
  },
  props: {
    MuiAppBar: {
      color: 'inherit',
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
};

const obt = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#3f51b5',
      select: '#e3f6ff',
    },
    secondary: {
      main: '#023047',
    },
    background: {
      default: '#ebecf0',
      paper: '#ffffff',
    },
    cardHeaderText: {
      main: '#555555',
    },
    cardHeaderBg: {
      main: '#f1f1f1',
    },
  },
  ...preDefault,
});

const textTree = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#023047',
      select: '#dbe1e5',
    },
    secondary: {
      main: '#ffb732',
    },
    background: {
      default: '#ebecf0',
      paper: '#ffffff',
    },
    cardHeaderText: {
      main: '#023047',
    },
    cardHeaderBg: {
      main: '#ffb732',
    },
  },
  ...preDefault,
});

const dark = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#023047',
      select: '#3f5a68',
    },
    secondary: {
      main: '#8dc9e5',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
      disabled: '#cccccc',
      hint: '#cccccc',
    },
    background: {
      default: '#17212b',
      paper: '#153647',
    },
    cardHeaderText: {
      main: '#023047',
    },
    cardHeaderBg: {
      main: '#8dc9e5',
    },
  },
  ...preDefault,
});

export const themes = { obt, dark, textTree };
