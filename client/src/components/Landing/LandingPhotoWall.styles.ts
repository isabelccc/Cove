import { makeStyles, alpha } from '@material-ui/core/styles';

const useLandingPhotoWallStyles = makeStyles((theme) => ({
  '@keyframes wallMarqueeL': {
    from: { transform: 'translateX(0)' },
    to: { transform: 'translateX(-50%)' },
  },
  '@keyframes wallMarqueeR': {
    from: { transform: 'translateX(-50%)' },
    to: { transform: 'translateX(0)' },
  },
  photoWallSection: {
    backgroundColor: '#000',
    boxSizing: 'border-box',
    minHeight: '100vh',
    scrollSnapAlign: 'start',
    padding: theme.spacing(7, 0, 8),
    overflow: 'hidden',
  },
  photoWallHead: {
    textAlign: 'center',
    padding: theme.spacing(0, 3, 4),
    maxWidth: 900,
    margin: '0 auto',
  },
  /** Same type scale as Hero `heroTitle` / Insights `insightsHeadTitle`. */
  photoWallTitle: {
    color: '#fafafa',
    fontWeight: 700,
    letterSpacing: '-0.038em',
    lineHeight: 1.12,
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
  photoWallTitleAccent: {
    color: theme.palette.primary.main,
    fontStyle: 'italic' as const,
    fontWeight: 800,
  },
  photoWallLead: {
    color: alpha('#fff', 0.55),
    fontSize: '0.95rem',
    lineHeight: 1.6,
  },
  photoWallRow: {
    overflow: 'hidden',
    width: '100%',
    marginBottom: theme.spacing(2),
    '&:last-child': {
      marginBottom: 0,
    },
  },
  photoWallTrack: {
    display: 'flex',
    width: 'max-content',
    animation: '$wallMarqueeL 52s linear infinite',
    '&:hover': {
      animationPlayState: 'paused',
    },
    '@media (prefers-reduced-motion: reduce)': {
      animation: 'none',
    },
  },
  photoWallTrackRev: {
    display: 'flex',
    width: 'max-content',
    animation: '$wallMarqueeR 58s linear infinite',
    '&:hover': {
      animationPlayState: 'paused',
    },
    '@media (prefers-reduced-motion: reduce)': {
      animation: 'none',
    },
  },
  wallCard: {
    flexShrink: 0,
    width: 220,
    marginRight: theme.spacing(2),
    borderRadius: 26,
    overflow: 'hidden',
    backgroundColor: '#141414',
    border: `1px solid ${alpha('#fff', 0.08)}`,
    boxShadow: `0 20px 50px ${alpha('#000', 0.5)}`,
  },
  wallCardImgWrap: {
    position: 'relative',
    height: 300,
    overflow: 'hidden',
  },
  wallCardImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  wallCardImgGrad: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '55%',
    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
    pointerEvents: 'none',
  },
  wallCardNameBlock: {
    position: 'absolute',
    left: 14,
    bottom: 14,
    right: 14,
    zIndex: 1,
  },
  wallCardName: {
    color: '#fff',
    fontWeight: 800,
    fontSize: '1rem',
    lineHeight: 1.2,
    textShadow: '0 2px 8px rgba(0,0,0,0.5)',
  },
  wallCardLoc: {
    color: alpha('#fff', 0.8),
    fontSize: '0.78rem',
    marginTop: 2,
    textShadow: '0 1px 6px rgba(0,0,0,0.5)',
  },
  wallCardFooter: {
    padding: theme.spacing(1.75, 2),
    backgroundColor: '#161616',
  },
  wallPostBlock: {
    marginBottom: theme.spacing(1),
  },
  wallPostLabel: {
    fontSize: '0.6rem',
    color: alpha('#fff', 0.4),
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    fontWeight: 700,
    marginBottom: 4,
  },
  wallPostTitle: {
    fontSize: '0.82rem',
    fontWeight: 700,
    color: alpha('#fff', 0.92),
    lineHeight: 1.35,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  wallTags: {
    fontSize: '0.65rem',
    color: alpha('#fff', 0.35),
    lineHeight: 1.45,
  },
}));

export default useLandingPhotoWallStyles;
