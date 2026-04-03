import { makeStyles, alpha } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: `0 4px 24px ${alpha(theme.palette.primary.main, 0.12)}`,
  },
  cardDialog: {
    marginTop: 0,
    boxShadow: 'none',
    border: 'none',
  },
  accentBar: {
    height: 4,
    background: `linear-gradient(90deg, ${theme.palette.primary.dark} 0%, `
      + `${theme.palette.primary.main} 45%, ${theme.palette.primary.light} 100%)`,
  },
  body: {
    padding: theme.spacing(2.5),
  },
  header: {
    marginBottom: theme.spacing(2),
  },
  headerTitle: {
    fontWeight: 800,
    letterSpacing: '-0.02em',
  },
  headerHint: {
    marginTop: theme.spacing(0.5),
    color: theme.palette.text.secondary,
    fontSize: '0.8125rem',
    lineHeight: 1.5,
  },
  field: {
    marginBottom: theme.spacing(2),
  },
  chipWrap: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  dropZone: {
    border: `2px dashed ${theme.palette.type === 'dark' ? 'rgba(255,255,255,0.2)' : alpha(theme.palette.primary.main, 0.45)}`,
    borderRadius: 12,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: theme.palette.type === 'dark' ? 'rgba(255,255,255,0.04)' : alpha(theme.palette.primary.main, 0.08),
    transition: 'border-color 0.2s, background-color 0.2s',
  },
  dropZoneLabel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
  },
  fileInput: {
    width: '100%',
    '& input[type="file"]': {
      width: '100%',
      padding: theme.spacing(1, 0),
      cursor: 'pointer',
    },
  },
  preview: {
    marginTop: theme.spacing(1),
    maxHeight: 160,
    maxWidth: '100%',
    borderRadius: 8,
    objectFit: 'cover',
    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
  },
  previewWrap: {
    position: 'relative',
    marginBottom: theme.spacing(2),
    textAlign: 'center',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  submitBtn: {
    borderRadius: 12,
    padding: '12px 24px',
    textTransform: 'none',
    fontWeight: 700,
    fontSize: '1rem',
    boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.35)}`,
  },
  resetBtn: {
    textTransform: 'none',
    fontWeight: 600,
  },
  emptyCard: {
    borderRadius: 16,
    padding: theme.spacing(3),
    textAlign: 'center',
    marginTop: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.type === 'dark' ? undefined : 'rgba(255,255,255,0.85)',
  },
  emptyIcon: {
    fontSize: 48,
    color: theme.palette.primary.light,
    marginBottom: theme.spacing(1),
  },
}));
