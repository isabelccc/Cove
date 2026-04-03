import type { Theme } from '@material-ui/core/styles';
import { alpha } from '@material-ui/core/styles';

/** Shared section chrome for landing subsections (dark theme). */
function landingSectionStyles(theme: Theme) {
  return {
    section: {
      boxSizing: 'border-box' as const,
      minHeight: '100vh',
      display: 'flex' as const,
      flexDirection: 'column' as const,
      justifyContent: 'center' as const,
      scrollSnapAlign: 'start' as const,
      padding: theme.spacing(6, 3),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(7, 4),
      },
      '& > .MuiContainer-root': {
        width: '100%',
      },
    },
    sectionWhite: {
      backgroundColor: '#000',
    },
    sectionTitle: {
      fontWeight: 700,
      letterSpacing: '-0.028em',
      fontSize: '1.75rem',
      marginBottom: theme.spacing(1),
      textAlign: 'center' as const,
      color: '#fafafa',
    },
    sectionLead: {
      textAlign: 'center' as const,
      color: alpha('#fff', 0.62),
      maxWidth: 520,
      margin: '0 auto',
      marginBottom: theme.spacing(4),
      lineHeight: 1.65,
      fontSize: '1.02rem',
      fontWeight: 400,
    },
  };
}

export default landingSectionStyles;
