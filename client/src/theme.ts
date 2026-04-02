import { createMuiTheme } from '@material-ui/core/styles';

/** App accent — matches palette.primary; use imports where theme hook is awkward (e.g. class components). */
export const BRAND_MAIN = '#f5da42';
export const BRAND_DARK = '#c9b02f';
export const BRAND_TEXT_ON = '#1a1d12';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: BRAND_MAIN,
      light: '#fae576',
      dark: BRAND_DARK,
      contrastText: BRAND_TEXT_ON,
    },
    secondary: {
      main: '#2e3318',
      contrastText: '#fafafa',
    },
  },
});

export default theme;
