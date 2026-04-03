import { makeStyles, alpha } from '@material-ui/core/styles';

const useLandingTopBarStyles = makeStyles((theme) => ({
  topBar: {
    position: 'sticky',
    top: 0,
    zIndex: 1100,
    padding: theme.spacing(1.5, 0),
    backgroundColor: alpha('#000', 0.85),
    backdropFilter: 'blur(12px)',
    borderBottom: `1px solid ${alpha('#fff', 0.08)}`,
  },
  topBarContain: {
    width: '100%',
  },
  topBarInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    padding: theme.spacing(0, 3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 2),
    },
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    textDecoration: 'none',
    color: '#fafafa',
  },
  brandMark: {
    height: 40,
    width: 'auto',
    minWidth: 100,
  },
  topActions: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  navLink: {
    textDecoration: 'none',
    color: alpha('#fff', 0.75),
    fontWeight: 600,
    fontSize: '0.9rem',
    padding: theme.spacing(1, 1.5),
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  primaryPill: {
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    fontWeight: 800,
    fontSize: '0.7rem',
    borderRadius: 10,
    padding: '10px 20px',
    boxShadow: `0 1px 0 ${alpha('#fff', 0.2)} inset, 0 6px 20px ${alpha(theme.palette.primary.main, 0.22)}`,
    '&:hover': {
      boxShadow: `0 1px 0 ${alpha('#fff', 0.28)} inset, 0 8px 26px ${alpha(theme.palette.primary.main, 0.32)}`,
    },
  },
}));

export default useLandingTopBarStyles;
