import { makeStyles } from '@material-ui/core/styles';

const useLandingRootStyles = makeStyles({
  root: {
    backgroundColor: '#000',
    minHeight: '100vh',
    /** Used by hero `min-height` so first paint fills one viewport under the sticky top bar. */
    '--landing-topbar-height': '64px',
    fontFamily: '"Outfit", "Heebo", -apple-system, BlinkMacSystemFont, sans-serif',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
});

export default useLandingRootStyles;
