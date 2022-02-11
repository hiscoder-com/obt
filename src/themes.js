import { createTheme } from '@material-ui/core/styles';

export const themeDefault = createTheme({
  type: 'light',
  palette: {
    type: 'light',
    secondary: {
      main: '#f1f1f1',
    },
    subcolor: {
      main: '#555555',
    },
    bgcolor: {
      main: '#ffffff',
    },
    background: {
      default: '#ebecf0',
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
});

export const themeTt = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#023047',
    },
    subcolor: {
      main: '#023047',
    },
    secondary: {
      main: '#ffb732',
    },
    bgcolor: {
      main: '#ffffff',
    },
    background: {
      default: '#ebecf0',
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
});

export const themeDark = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#023047',
    },
    subcolor: {
      main: '#023047',
    },
    secondary: {
      main: '#8dc9e5',
    },
    bgcolor: {
      main: '#023047',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
      disabled: '#cccccc',
    },
    background: {
      default: '#153647',
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
});
