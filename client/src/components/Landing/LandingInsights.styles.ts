import { makeStyles, alpha } from '@material-ui/core/styles';

import landingSectionStyles from './landingShared.styles';

const useLandingInsightsStyles = makeStyles((theme) => ({
  ...landingSectionStyles(theme),
  /** Same type scale as Hero `heroTitle` (“Where your people see your story.”). */
  insightsHeadTitle: {
    fontWeight: 700,
    letterSpacing: '-0.038em',
    lineHeight: 1.12,
    fontSize: '2.5rem',
    marginBottom: theme.spacing(4),
    textAlign: 'center' as const,
    color: '#fafafa',
    [theme.breakpoints.up('sm')]: {
      fontSize: '3.1rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '3.55rem',
      marginBottom: theme.spacing(5),
    },
  },
  insightsHeadLead: {
    textAlign: 'center' as const,
    color: alpha('#fff', 0.65),
    maxWidth: 640,
    margin: '0 auto',
    marginBottom: theme.spacing(4),
    lineHeight: 1.75,
    fontSize: '1.08rem',
    fontWeight: 400,
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.15rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.22rem',
      maxWidth: 680,
      marginBottom: theme.spacing(5),
    },
  },
  insightCard: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    padding: theme.spacing(2.5),
    borderRadius: 18,
    backgroundColor: '#141414',
    border: `1px solid ${alpha('#fff', 0.08)}`,
    height: '100%',
    boxShadow: `0 4px 24px ${alpha('#000', 0.5)}`,
  },
  insightIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: alpha(theme.palette.primary.main, 0.55),
    color: theme.palette.primary.contrastText,
    flexShrink: 0,
  },
  insightLabel: {
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    color: alpha('#fff', 0.45),
    textTransform: 'uppercase',
  },
  insightValue: {
    fontWeight: 800,
    fontSize: '1.35rem',
    color: '#fafafa',
    lineHeight: 1.2,
  },
  insightCaption: {
    color: alpha('#fff', 0.5),
    display: 'block',
    marginTop: 4,
  },
}));

export default useLandingInsightsStyles;
