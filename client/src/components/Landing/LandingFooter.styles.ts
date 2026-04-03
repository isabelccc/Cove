import { makeStyles, alpha } from '@material-ui/core/styles';

const useLandingFooterStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(4, 3),
    backgroundColor: '#000',
    borderTop: `1px solid ${alpha('#fff', 0.08)}`,
    scrollSnapAlign: 'start',
  },
  footerRow: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(2),
    textAlign: 'center',
  },
  footerLinks: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(2),
    justifyContent: 'center',
    '& a': {
      color: alpha('#fff', 0.72),
      textDecoration: 'none',
      fontWeight: 600,
      fontSize: '0.875rem',
      '&:hover': { color: theme.palette.primary.main },
    },
  },
  credit: {
    fontSize: '0.7rem',
    color: alpha('#fff', 0.45),
    maxWidth: 640,
    lineHeight: 1.5,
    '& a': {
      color: alpha('#fff', 0.78),
      '&:hover': { color: theme.palette.primary.main },
    },
  },
}));

export default useLandingFooterStyles;
