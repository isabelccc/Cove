import { makeStyles, alpha } from '@material-ui/core/styles';

import { landingImage } from './landingConstants';

const useLandingWideBannerStyles = makeStyles((theme) => ({
  wideBanner: {
    position: 'relative',
    boxSizing: 'border-box',
    scrollSnapAlign: 'start',
    backgroundImage: `url(${landingImage('landing-party')})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(7, 3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(9, 3),
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      background: `linear-gradient(90deg, ${alpha('#000', 0.55)} 0%, ${alpha('#000', 0.35)} 100%)`,
    },
  },
  wideBannerInner: {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    maxWidth: 560,
  },
  wideBannerTitle: {
    color: '#fff',
    fontWeight: 700,
    fontSize: '1.85rem',
    marginBottom: theme.spacing(2),
    letterSpacing: '-0.025em',
  },
  wideBannerBtn: {
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    fontWeight: 800,
    fontSize: '0.8125rem',
    borderRadius: 10,
    padding: '14px 32px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    boxShadow: `0 1px 0 ${alpha('#fff', 0.2)} inset, 0 8px 24px ${alpha('#000', 0.35)}`,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: `0 1px 0 ${alpha('#fff', 0.25)} inset, 0 10px 28px ${alpha('#000', 0.4)}`,
    },
  },
}));

export default useLandingWideBannerStyles;
