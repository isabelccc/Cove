import { createMuiTheme } from '@material-ui/core/styles';

/** App accent — matches palette.primary; use imports where theme hook is awkward (e.g. class components). */
export const BRAND_MAIN = '#dce87a';
export const BRAND_LIGHT = '#eaeea8';
export const BRAND_DARK = '#b5c04a';
export const BRAND_TEXT_ON = '#141414';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: BRAND_MAIN,
      light: BRAND_LIGHT,
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
