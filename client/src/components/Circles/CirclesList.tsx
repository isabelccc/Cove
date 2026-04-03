import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import {
  Container,
  Typography,
  Button,
  TextField,
  Paper,
  Box,
  CircularProgress,
  Grid,
  Card,
  CardActionArea,
  CardActions,
  Avatar,
  Chip,
  Snackbar,
  InputAdornment,
} from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import GroupWork from '@material-ui/icons/GroupWork';
import LockOutlined from '@material-ui/icons/LockOutlined';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import { alpha, useTheme } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';

import * as api from '../../api';
import { Group } from '../../types';
import useCirclesPageStyles from './circlesStyles';

const CirclesList: React.FC = () => {
  const theme = useTheme();
  const classes = useCirclesPageStyles();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);
  const history = useHistory();

  const load = async (): Promise<void> => {
    setLoading(true);
    try {
      const { data } = await api.fetchMyGroups();
      setGroups(data.data || []);
    } catch {
      setGroups([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const copyInvite = (token: string): void => {
    const url = `${window.location.origin}/join/${encodeURIComponent(token)}`;
    navigator.clipboard.writeText(url).then(() => setSnackOpen(true)).catch(() => {});
  };

  const handleCreate = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    setCreating(true);
    setCreateError('');
    try {
      const { data } = await api.createGroup(trimmed);
      setName('');
      await load();
      history.push(`/circles/${data._id}`);
    } catch {
      setCreateError('Could not create circle.');
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <Box className={classes.page} display="flex" justifyContent="center" alignItems="center" minHeight={320}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className={classes.page}>
      <Container maxWidth="md">
        <Snackbar
          open={snackOpen}
          autoHideDuration={2800}
          onClose={() => setSnackOpen(false)}
          message="Invite link copied to clipboard"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />

        <Box className={classes.hero}>
          <Typography variant="h3" component="h1" className={classes.heroTitle}>
            Circles
          </Typography>
          <Typography className={classes.heroSubtitle} variant="body1">
            Small private walls for people you know. Only members see posts—nothing is public or discoverable.
          </Typography>
          <div className={classes.chipRow}>
            <Chip icon={<LockOutlined />} size="small" label="Invite-only" variant="outlined" color="primary" />
            <Chip icon={<GroupWork />} size="small" label="Shared photo wall" variant="outlined" />
          </div>
        </Box>

        <Paper className={classes.createCard} elevation={0}>
          <div className={classes.createCardBar} />
          <div className={classes.createBody}>
            <Typography variant="h6" className={classes.createTitle}>
              Start a new circle
            </Typography>
            {createError ? (
              <Typography color="error" variant="body2" style={{ marginBottom: 12 }}>
                {createError}
              </Typography>
            ) : null}
            <form onSubmit={handleCreate}>
              <Box display="flex" flexWrap="wrap" alignItems="flex-start">
                <TextField
                  label="Circle name"
                  placeholder="e.g. Weekend crew, Family 2026"
                  variant="outlined"
                  value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  fullWidth
                  style={{ flex: '1 1 240px', marginRight: 12, marginBottom: 8 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AddCircleOutline color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={creating}
                  style={{ minWidth: 140, height: 56 }}
                >
                  {creating ? 'Creating…' : 'Create'}
                </Button>
              </Box>
            </form>
          </div>
        </Paper>

        {!groups.length ? (
          <Paper className={classes.emptyState} elevation={0}>
            <GroupWork style={{ fontSize: 48, color: '#9fa8da', marginBottom: 16 }} />
            <Typography variant="h6" gutterBottom>
              No circles yet
            </Typography>
            <Typography color="textSecondary" style={{ maxWidth: 360, margin: '0 auto' }}>
              Create one above, or open an invite link. After sign-in you will join the circle automatically.
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {groups.map((g) => (
              <Grid item xs={12} sm={6} md={4} key={g._id}>
                <Card className={classes.circleCard} elevation={0}>
                  <CardActionArea component={Link} to={`/circles/${g._id}`}>
                    <div className={classes.circleCardMedia}>
                      <Avatar className={classes.circleAvatar}>
                        {(g.name && g.name.charAt(0).toUpperCase()) || '?'}
                      </Avatar>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="h6" component="h2" noWrap style={{ fontWeight: 700 }}>
                          {g.name}
                        </Typography>
                        <Box mt={1}>
                          <Chip
                            size="small"
                            label={`${g.memberIds.length} member${g.memberIds.length === 1 ? '' : 's'}`}
                            style={{
                              backgroundColor: alpha(theme.palette.primary.main, 0.15),
                              color: theme.palette.primary.dark,
                              fontWeight: 600,
                            }}
                          />
                        </Box>
                      </div>
                    </div>
                  </CardActionArea>
                  <CardActions className={classes.circleCardActions}>
                    <Button
                      size="small"
                      startIcon={<LinkIcon />}
                      onClick={(e) => {
                        e.preventDefault();
                        copyInvite(g.inviteToken);
                      }}
                    >
                      Copy invite
                    </Button>
                    <Button size="small" color="primary" component={Link} to={`/circles/${g._id}`}>
                      Open wall
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default CirclesList;
