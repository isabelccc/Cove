import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import { GroupMember } from '../../types';
import useCirclesPageStyles from './circlesStyles';

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase() || '?';
}

interface GroupMembersPanelProps {
  members: GroupMember[];
  loading: boolean;
}

const GroupMembersPanel: React.FC<GroupMembersPanelProps> = ({ members, loading }) => {
  const classes = useCirclesPageStyles();

  return (
    <Paper className={classes.membersPanel} elevation={0}>
      <Typography className={classes.membersPanelTitle} variant="subtitle1">
        Circle members
      </Typography>
      <Typography className={classes.membersPanelHint} variant="body2" component="p">
        People in this private circle. Tap a name to view their profile.
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" py={3}>
          <CircularProgress size={28} />
        </Box>
      )}
      {!loading && members.length === 0 && (
        <Typography variant="body2" color="textSecondary" style={{ padding: '8px 0' }}>
          No members loaded yet.
        </Typography>
      )}
      {!loading && members.length > 0 && (
        <List className={classes.membersList} disablePadding>
          {members.map((m) => (
            <ListItem
              key={m.id}
              button
              component={Link}
              to={`/profile/${m.id}`}
              className={classes.memberRow}
            >
              <ListItemAvatar>
                <Avatar className={classes.memberAvatar}>{initials(m.name)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<span className={classes.memberName}>{m.name}</span>}
                secondary={m.role}
                secondaryTypographyProps={{ className: classes.memberRole }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default GroupMembersPanel;
