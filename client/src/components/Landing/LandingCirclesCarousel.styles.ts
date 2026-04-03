import { makeStyles, alpha } from '@material-ui/core/styles';

import landingSectionStyles from './landingShared.styles';

const useLandingCirclesCarouselStyles = makeStyles((theme) => ({
  ...landingSectionStyles(theme),
  circlesCarouselSection: {
    backgroundColor: '#000',
    boxSizing: 'border-box',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    scrollSnapAlign: 'start',
    padding: theme.spacing(5, 0, 6),
  },
  circlesCarouselHead: {
    textAlign: 'center',
    padding: theme.spacing(0, 3, 3),
    maxWidth: 900,
    margin: '0 auto',
  },
  /** Same scale as PhotoWall `photoWallTitle` / `photoWallTitleAccent`. */
  circlesCarouselHeadTitle: {
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
  circlesCarouselHeadTitleAccent: {
    color: theme.palette.primary.main,
    fontStyle: 'italic' as const,
    fontWeight: 800,
  },
  circlesCarouselRow: {
    position: 'relative',
    width: '100%',
    height: 'var(--carousel-strip-height, 500px)',
    minHeight: 'var(--carousel-strip-height, 500px)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    // Must match .circlesIntroCard `left` and viewport left mask width.
    '--carousel-intro-left': '35px',
  },
  /** Full-width strip; track padding-left matches intro panel width so posts slide under the overlay. */
  circlesCarouselViewport: {
    flex: 1,
    minWidth: 0,
    alignSelf: 'stretch',
    position: 'relative',
    zIndex: 0,
    overflowX: 'auto',
    overflowY: 'hidden',
    scrollBehavior: 'smooth',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    WebkitOverflowScrolling: 'touch',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    /**
     * Soft edge: cards fade into section bg before the intro (no hard bar).
     * Intro panel + its left shadow (below) sell the “stacked under green” read.
     */
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 'calc(var(--carousel-intro-left) + 56px)',
      background: `linear-gradient(90deg, #000 0%, ${alpha('#000', 0.88)} 28%, ${alpha('#000', 0.25)} 72%, transparent 100%)`,
      zIndex: 15,
      pointerEvents: 'none',
    },
  },
  circlesCarouselTrack: {
    position: 'relative',
    zIndex: 0,
    display: 'flex',
    alignItems: 'stretch',
    gap: theme.spacing(3),
    boxSizing: 'border-box',
    height: '100%',
    minHeight: 'var(--carousel-strip-height, 500px)',
    // Match .circlesIntroCard left + width + gap (pic2-style tiled row, no overlap at scroll 0).
    paddingLeft: `calc(var(--carousel-intro-left) + min(420px, 85vw) + ${theme.spacing(3)})`,
    paddingRight: theme.spacing(3),
    width: 'max-content',
  },
  /**
   * Lime intro on top of the feed track; left shadow + z-index read as physical stack.
   */
  circlesIntroCard: {
    position: 'absolute',
    left: 'var(--carousel-intro-left)',
    top: 0,
    bottom: 0,
    zIndex: 30,
    boxSizing: 'border-box',
    width: 'min(420px, 85vw)',
    borderRadius: 28,
    padding: theme.spacing(3.5),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    boxShadow: `${`-18px 0 36px ${alpha('#000', 0.48)}, `
      + `-8px 0 20px ${alpha('#000', 0.22)}, `
      + `0 12px 36px ${alpha('#000', 0.35)}`}`,
    transform: 'translateZ(0)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    pointerEvents: 'auto',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
  },
  circlesAvatarStack: {
    display: 'flex',
    alignItems: 'center',
    // Visual-only nudge: does not shift title/body in the layout (unlike negative marginTop).
    transform: `translateY(-${theme.spacing(2)})`,
    marginBottom: theme.spacing(2.5),
    '& > *': {
      width: 44,
      height: 44,
      borderRadius: '50%',
      border: '3px solid #dce87a',
      overflow: 'hidden',
      marginLeft: -14,
      flexShrink: 0,
      backgroundColor: '#1a1a1a',
      boxShadow: `0 2px 8px ${alpha('#000', 0.2)}`,
      '&:first-child': {
        marginLeft: 0,
      },
    },
  },
  circlesAvatarStackImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  circlesIntroTitle: {
    fontWeight: 800,
    fontSize: '1.65rem',
    lineHeight: 1.12,
    letterSpacing: '-0.02em',
    marginBottom: theme.spacing(2),
  },
  circlesIntroAccent: {
    color: '#ec4899',
    fontStyle: 'italic',
    fontWeight: 800,
    fontSize: '3.65rem',
    marginLeft: 35,
  },
  circlesIntroBody: {
    fontSize: '0.9rem',
    lineHeight: 1.6,
    color: alpha(theme.palette.primary.contrastText, 0.82),
    '& p': {
      margin: 0,
      marginBottom: theme.spacing(1.5),
    },
    '& p:first-of-type': {
      fontWeight: 700,
    },
    '& p:last-child': {
      marginBottom: 0,
    },
  },
  /** Slightly narrower than intro panel; pic2-style tiled posts, same strip height. */
  circlesFeedCard: {
    flexShrink: 0,
    alignSelf: 'stretch',
    width: 'min(320px, 74vw)',
    height: '100%',
    maxHeight: 'var(--carousel-strip-height, 500px)',
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#fff',
    boxShadow: `0 16px 48px ${alpha('#000', 0.35)}`,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    zIndex: 1,
  },
  circlesFeedHead: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    padding: theme.spacing(1.75, 2),
  },
  circlesFeedAvatar: {
    width: 42,
    height: 42,
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: 0,
    backgroundColor: '#eee',
  },
  circlesFeedAvatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  circlesFeedName: {
    fontWeight: 800,
    fontSize: '0.95rem',
    color: '#111',
    lineHeight: 1.2,
  },
  circlesFeedSub: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: '0.72rem',
    color: '#666',
    marginTop: 2,
    '& svg': {
      fontSize: '0.95rem',
    },
  },
  circlesFeedMedia: {
    padding: theme.spacing(0, 1.5, 1.5),
    flex: 1,
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  circlesFeedImg: {
    width: '100%',
    flex: 1,
    minHeight: 0,
    display: 'block',
    objectFit: 'cover',
    borderRadius: 16,
  },
  circlesFeedCaption: {
    padding: theme.spacing(0, 2, 1.5),
    fontSize: '0.82rem',
    lineHeight: 1.45,
    color: '#444',
  },
  circlesFeedActions: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    padding: theme.spacing(1, 1.5, 1.75),
    borderTop: '1px solid #eee',
  },
  circlesFeedActionBtn: {
    padding: theme.spacing(0.75),
    color: '#333',
  },
  circlesNav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(2.5),
    gap: theme.spacing(0.5),
  },
  circlesNavBtn: {
    color: alpha('#fff', 0.85),
    padding: theme.spacing(1),
    '&:hover': {
      backgroundColor: alpha('#fff', 0.08),
      color: '#fff',
    },
    '&.Mui-disabled': {
      color: alpha('#fff', 0.25),
    },
  },
  circlesNavDivider: {
    width: 1,
    height: 22,
    backgroundColor: alpha('#fff', 0.25),
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
}));

export default useLandingCirclesCarouselStyles;
