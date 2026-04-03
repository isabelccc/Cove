import { makeStyles, alpha } from '@material-ui/core/styles';

const useLandingHeroStyles = makeStyles((theme) => ({
  hero: {
    boxSizing: 'border-box',
    minHeight: 'calc(100dvh - var(--landing-topbar-height, 64px))',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    scrollSnapAlign: 'start',
    padding: theme.spacing(6, 3, 8),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8, 3, 10),
    },
    '& > .MuiContainer-root': {
      width: '100%',
    },
  },
  /** Nudges headline + body + CTAs slightly lower in the column. */
  heroCopy: {
    paddingTop: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(5),
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(10),
    },
  },
  heroTitle: {
    fontWeight: 700,
    letterSpacing: '-0.038em',
    lineHeight: 1.12,
    color: '#fafafa',
    fontSize: '2.5rem',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      fontSize: '3.1rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '3.55rem',
      marginBottom: theme.spacing(5),
    },
  },
  heroTitleAccent: {
    color: theme.palette.primary.main,
    fontStyle: 'italic',
    fontWeight: 800,
  },
  heroLead: {
    fontSize: '1.0625rem',
    fontWeight: 400,
    lineHeight: 1.85,
    color: alpha('#fff', 0.72),
    maxWidth: 500,
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      maxWidth: 'none',
      marginBottom: theme.spacing(4),
    },
  },
  /** Second body paragraph: same type rhythm, space before buttons. */
  heroLeadFollow: {
    fontSize: '1.0625rem',
    fontWeight: 400,
    lineHeight: 1.85,
    color: alpha('#fff', 0.72),
    maxWidth: 500,
    marginBottom: theme.spacing(5),
    [theme.breakpoints.up('md')]: {
      maxWidth: 'none',
      marginBottom: theme.spacing(6),
    },
  },
  heroBtns: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  heroBtnMain: {
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    fontWeight: 800,
    fontSize: '0.8125rem',
    borderRadius: 10,
    padding: '14px 30px',
    boxShadow: `0 1px 0 ${alpha('#fff', 0.22)} inset, 0 10px 28px ${alpha(theme.palette.primary.main, 0.28)}`,
    '&:hover': {
      boxShadow: `0 1px 0 ${alpha('#fff', 0.3)} inset, 0 14px 36px ${alpha(theme.palette.primary.main, 0.38)}`,
    },
  },
  heroBtnGhost: {
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    fontWeight: 700,
    fontSize: '0.8125rem',
    borderRadius: 10,
    padding: '14px 26px',
    borderWidth: 2,
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    backgroundColor: 'transparent',
    '&:hover': {
      borderColor: theme.palette.primary.light,
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.light,
    },
  },
  /** Keep collage near the copy column (flex-start) instead of pinned to the far right. */
  heroVisualWrap: {
    marginTop: theme.spacing(4),
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      marginTop: 0,
      justifyContent: 'flex-start',
    },
  },
  heroVisual: {
    position: 'relative',
    width: 'fit-content',
    maxWidth: '100%',
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 1, 1, 1),
    },
  },
  /**
   * Creatorland-style collage: one tall arch + smaller card tucked bottom-left + mark top-right.
   */
  heroArchStack: {
    position: 'relative',
    width: 'min(340px, 88vw)',
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      width: 'min(100%, 520px)',
      paddingBottom: theme.spacing(7),
      paddingLeft: 0,
    },
  },
  heroArchMain: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    aspectRatio: '4 / 5',
    borderTopLeftRadius: '999px',
    borderTopRightRadius: '999px',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    boxShadow: `0 28px 64px ${alpha('#000', 0.5)}`,
    border: `1px solid ${alpha('#fff', 0.12)}`,
    zIndex: 1,
  },
  heroArchFloat: {
    position: 'absolute',
    left: 0,
    bottom: theme.spacing(2),
    width: '54%',
    maxWidth: 222,
    aspectRatio: '4 / 5',
    borderRadius: 22,
    overflow: 'hidden',
    zIndex: 2,
    boxShadow: `0 20px 48px ${alpha('#000', 0.45)}`,
    border: `1px solid ${alpha('#fff', 0.14)}`,
    [theme.breakpoints.up('md')]: {
      left: -6,
      bottom: theme.spacing(1),
      maxWidth: 258,
      borderRadius: 26,
    },
  },
  heroArchImg: {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center top',
  },
  /** Cove mark where reference uses a star — sits on the arch shoulder, top-right. */
  heroLogo: {
    position: 'absolute',
    top: -12,
    right: -8,
    width: 'min(220px, 46vw)',
    height: 96,
    zIndex: 4,
    boxSizing: 'border-box',
    pointerEvents: 'none',
    [theme.breakpoints.up('md')]: {
      top: -20,
      right: -14,
      width: 264,
      height: 114,
    },
  },
  heroLogoMark: {
    display: 'block',
    width: '100%',
    height: '100%',
  },
}));

export default useLandingHeroStyles;
