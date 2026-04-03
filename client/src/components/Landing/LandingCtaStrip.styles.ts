import { makeStyles, alpha } from '@material-ui/core/styles';

const useLandingCtaStripStyles = makeStyles((theme) => ({
  ctaStrip: {
    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.primary.contrastText,
    textAlign: 'center',
    boxSizing: 'border-box',
    scrollSnapAlign: 'start',
    padding: theme.spacing(5, 3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6, 4),
    },
  },
  ctaTitle: {
    fontWeight: 700,
    fontSize: '1.85rem',
    marginBottom: theme.spacing(2),
    letterSpacing: '-0.025em',
  },
  ctaLead: {
    opacity: 0.95,
    lineHeight: 1.65,
    fontSize: '1.02rem',
    fontWeight: 400,
  },
  ctaBtn: {
    marginTop: theme.spacing(1),
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    fontWeight: 800,
    fontSize: '0.8125rem',
    borderRadius: 10,
    padding: '14px 34px',
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.dark,
    boxShadow: `0 4px 22px ${alpha('#000', 0.2)}`,
    '&:hover': {
      backgroundColor: '#fff',
      boxShadow: `0 6px 28px ${alpha('#000', 0.28)}`,
    },
  },
}));

export default useLandingCtaStripStyles;
