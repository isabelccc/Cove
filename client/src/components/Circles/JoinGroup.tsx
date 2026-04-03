import React, { useEffect, useState } from 'react';
import { Typography, Button, CircularProgress, Box, Paper, Container } from '@material-ui/core';
import { alpha, useTheme } from '@material-ui/core/styles';
import GroupAdd from '@material-ui/icons/GroupAdd';
import { useParams, useHistory } from 'react-router-dom';

import * as api from '../../api';
import useCirclesPageStyles from './circlesStyles';

const JoinGroup: React.FC = () => {
  const theme = useTheme();
  const classes = useCirclesPageStyles();
  const { inviteToken: rawToken } = useParams<{ inviteToken: string }>();
  const history = useHistory();
  const [status, setStatus] = useState<'pending' | 'error'>('pending');

  const inviteToken = rawToken ? decodeURIComponent(rawToken) : '';
  const loggedIn = Boolean(localStorage.getItem('profile'));

  useEffect(() => {
    if (!inviteToken || !localStorage.getItem('profile')) {
      return undefined;
    }

    let cancelled = false;
    const run = async (): Promise<void> => {
      try {
        const { data } = await api.joinGroupByToken(inviteToken);
        if (!cancelled) history.replace(`/circles/${data._id}`);
      } catch {
        if (!cancelled) setStatus('error');
      }
    };
    run();

    return (): void => {
      cancelled = true;
    };
  }, [inviteToken, history]);

  const card = (children: React.ReactNode): JSX.Element => (
    <Box className={classes.page} display="flex" justifyContent="center" alignItems="flex-start" paddingTop={4}>
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          style={{
            borderRadius: 16,
            padding: 32,
            textAlign: 'center',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: `0 8px 40px ${alpha(theme.palette.primary.main, 0.12)}`,
          }}
        >
          {children}
        </Paper>
      </Container>
    </Box>
  );

  if (!inviteToken) {
    return card(
      <>
        <Typography variant="h6" gutterBottom>
          Invalid link
        </Typography>
        <Typography color="textSecondary">This invite URL is incomplete. Ask your friend to send the link again.</Typography>
        <Button variant="contained" color="primary" style={{ marginTop: 24 }} onClick={() => history.push('/circles')}>
          Go to circles
        </Button>
      </>,
    );
  }

  if (!loggedIn) {
    return card(
      <>
        <GroupAdd style={{ fontSize: 56, color: theme.palette.primary.dark, marginBottom: 16 }} />
        <Typography variant="h5" gutterBottom style={{ fontWeight: 700 }}>
          You are invited
        </Typography>
        <Typography color="textSecondary" paragraph style={{ lineHeight: 1.6 }}>
          Sign in to join this circle. After you log in, you will be added automatically.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={{ marginTop: 8, borderRadius: 12, textTransform: 'none', fontWeight: 700, padding: '12px 32px' }}
          onClick={() => {
            sessionStorage.setItem('pendingInviteToken', inviteToken);
            history.push('/auth');
          }}
        >
          Sign in to join
        </Button>
      </>,
    );
  }

  if (status === 'error') {
    return card(
      <>
        <Typography color="error" variant="h6" gutterBottom>
          Could not join
        </Typography>
        <Typography color="textSecondary" paragraph>
          This invite may be wrong or expired, or you no longer have access.
        </Typography>
        <Button variant="contained" color="primary" style={{ marginTop: 16, borderRadius: 12 }} onClick={() => history.push('/circles')}>
          Back to circles
        </Button>
      </>,
    );
  }

  return (
    <Box className={classes.page} display="flex" justifyContent="center" paddingTop={8}>
      <CircularProgress />
    </Box>
  );
};

export default JoinGroup;
