import React, { useState, KeyboardEvent, ChangeEvent, useEffect } from 'react';
import {
  Container,
  Grow,
  Grid,
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Snackbar,
  Dialog,
  DialogContent,
  Fab,
} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Search from '@material-ui/icons/Search';
import PeopleOutline from '@material-ui/icons/PeopleOutline';
import LockOutlined from '@material-ui/icons/LockOutlined';
import LinkIcon from '@material-ui/icons/Link';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams, Link } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import { getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import useHomeStyles from '../Home/styles';
import useCirclesPageStyles from './circlesStyles';
import GroupMembersPanel from './GroupMembersPanel';
import { fetchGroup } from '../../api';
import { BRAND_TEXT_ON } from '../../theme';
import { Group, Profile } from '../../types';

function useQuery(): URLSearchParams {
  return new URLSearchParams(useLocation().search);
}

const GroupWall: React.FC = () => {
  const homeClasses = useHomeStyles();
  const pageClasses = useCirclesPageStyles();
  const { groupId } = useParams<{ groupId: string }>();
  const location = useLocation();
  const isSearch = location.pathname.endsWith('/search');
  const query = useQuery();
  const page = Number(query.get('page')) || 1;
  const searchQuery = query.get('searchQuery');

  const [circleName, setCircleName] = useState<string>('');
  const [groupDetail, setGroupDetail] = useState<Group | null>(null);
  const [groupLoading, setGroupLoading] = useState(true);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();

  const [search, setSearch] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const [composerOpen, setComposerOpen] = useState(false);
  const history = useHistory();

  const wallRaw = localStorage.getItem('profile');
  let wallUser: Profile | null = null;
  try {
    wallUser = wallRaw ? JSON.parse(wallRaw) as Profile : null;
  } catch {
    wallUser = null;
  }
  const canUseComposer = Boolean(wallUser?.result?.name && groupId);

  const closeComposer = (): void => {
    setCurrentId(null);
    setComposerOpen(false);
  };

  const openPostEditor = (id: string | null): void => {
    setCurrentId(id);
    if (id !== null) setComposerOpen(true);
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setGroupLoading(true);
      try {
        const { data } = await fetchGroup(groupId);
        if (!cancelled) {
          setCircleName(data?.name || '');
          setGroupDetail(data || null);
        }
      } catch {
        if (!cancelled) {
          setCircleName('');
          setGroupDetail(null);
        }
      } finally {
        if (!cancelled) setGroupLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [groupId]);

  useEffect(() => {
    if (!groupId || !isSearch) return;
    const q = new URLSearchParams(location.search);
    const sq = q.get('searchQuery');
    const t = q.get('tags') || '';
    const tagParts = t.split(',').filter(Boolean);
    const text = sq && sq !== 'none' ? sq : '';
    if (!text && tagParts.length === 0) return;
    dispatch(
      getPostsBySearch({
        search: text || 'none',
        tags: t,
        groupId,
      }),
    );
  }, [groupId, isSearch, location.search, dispatch]);

  const searchPost = (): void => {
    if (!groupId) return;
    if (search.trim() || tags.length > 0) {
      dispatch(getPostsBySearch({ search, tags: tags.join(','), groupId }));
      history.push(`/circles/${groupId}/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push(`/circles/${groupId}`);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      searchPost();
    }
  };

  const handleAddChip = (tag: string): void => {
    setTags([...tags, tag]);
  };

  const handleDeleteChip = (chipToDelete: string): void => {
    setTags(tags.filter((tag) => tag !== chipToDelete));
  };

  const copyInvite = (): void => {
    const token = groupDetail?.inviteToken;
    if (!token) return;
    const url = `${window.location.origin}/join/${encodeURIComponent(token)}`;
    navigator.clipboard.writeText(url).then(() => setSnackOpen(true)).catch(() => {});
  };

  const memberCount = groupDetail?.members?.length ?? groupDetail?.memberIds?.length ?? 0;

  return (
    <Grow in>
      <Box className={pageClasses.page}>
        <Container maxWidth={false} style={{ padding: 0 }}>
          <Paper className={pageClasses.wallHeader} elevation={0}>
            <IconButton component={Link} to="/circles" aria-label="Back to circles" size="small" style={{ marginTop: 4 }}>
              <ChevronLeft />
            </IconButton>
            <Box flex={1} minWidth={0}>
              <Typography variant="h4" component="h1" className={pageClasses.wallTitle} noWrap>
                {circleName || 'Circle'}
              </Typography>
              <Typography className={pageClasses.wallMeta}>
                {isSearch ? 'Showing search results in this circle only' : 'Photos and moments visible only to members'}
              </Typography>
            </Box>
          </Paper>

          <Box className={pageClasses.insightsRow}>
            <Paper className={pageClasses.insightCard} elevation={0}>
              <Box className={pageClasses.insightIconBox}>
                <PeopleOutline htmlColor={BRAND_TEXT_ON} />
              </Box>
              <Box>
                <Typography className={pageClasses.insightLabel}>Members</Typography>
                <Typography className={pageClasses.insightValue}>
                  {groupLoading ? '—' : memberCount}
                </Typography>
              </Box>
            </Paper>
            <Paper className={pageClasses.insightCard} elevation={0}>
              <Box className={pageClasses.insightIconBox}>
                <LockOutlined htmlColor={BRAND_TEXT_ON} />
              </Box>
              <Box>
                <Typography className={pageClasses.insightLabel}>Visibility</Typography>
                <Typography className={pageClasses.insightValue} style={{ fontSize: '1rem', fontWeight: 700 }}>
                  Members only
                </Typography>
              </Box>
            </Paper>
            <Paper className={pageClasses.insightCard} elevation={0} style={{ cursor: groupDetail?.inviteToken ? 'pointer' : 'default' }} onClick={groupDetail?.inviteToken ? copyInvite : undefined} role={groupDetail?.inviteToken ? 'button' : undefined}>
              <Box className={pageClasses.insightIconBox}>
                <LinkIcon htmlColor={BRAND_TEXT_ON} />
              </Box>
              <Box>
                <Typography className={pageClasses.insightLabel}>Invite</Typography>
                <Typography className={pageClasses.insightValue} style={{ fontSize: '0.95rem', fontWeight: 700 }}>
                  {groupDetail?.inviteToken ? 'Copy invite link' : '—'}
                </Typography>
              </Box>
            </Paper>
          </Box>

          <Grid container spacing={3} className={homeClasses.gridContainer}>
            <Grid item xs={12} md={3} className={pageClasses.colLeft}>
              <div style={{ position: 'sticky', top: 20 }}>
                <Box className={pageClasses.leftRail}>
                  <Box className={pageClasses.railNav}>
                    <span className={`${pageClasses.railNavItem} ${pageClasses.railNavItemActive}`}>
                      Circle feed
                    </span>
                    <Link to="/circles" className={pageClasses.railNavItem}>
                      All circles
                    </Link>
                  </Box>
                </Box>
                <Paper className={pageClasses.searchPanel} elevation={0}>
                  <Typography className={pageClasses.searchPanelLabel} variant="subtitle1">
                    Search this circle
                  </Typography>
                  <TextField
                    onKeyDown={handleKeyPress}
                    name="search"
                    variant="outlined"
                    label="Keywords"
                    fullWidth
                    size="small"
                    value={search}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                    style={{ marginBottom: 12 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search color="action" fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <ChipInput
                    style={{ marginBottom: 12 }}
                    value={tags}
                    onAdd={(chip) => handleAddChip(chip as string)}
                    onDelete={(chip) => handleDeleteChip(chip as string)}
                    label="Tags"
                    variant="outlined"
                  />
                  <Button onClick={searchPost} variant="contained" color="primary" fullWidth>
                    Search
                  </Button>
                </Paper>
                {!isSearch && !searchQuery && tags.length === 0 && (
                  <Paper className={homeClasses.pagination} elevation={0} style={{ marginTop: 16, borderRadius: 16, border: '1px solid rgba(0,0,0,0.08)' }}>
                    <Pagination page={page} groupId={groupId} />
                  </Paper>
                )}
              </div>
            </Grid>

            <Grid item xs={12} md={6} className={pageClasses.colFeed}>
              <Posts setCurrentId={openPostEditor} />
            </Grid>

            <Grid item xs={12} md={3} className={pageClasses.colRight}>
              <GroupMembersPanel
                members={groupDetail?.members ?? []}
                loading={groupLoading}
              />
            </Grid>
          </Grid>
        </Container>

        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={snackOpen}
          autoHideDuration={4000}
          onClose={() => setSnackOpen(false)}
          message="Invite link copied"
        />

        {canUseComposer && (
          <>
            {!composerOpen && (
              <Fab
                className={pageClasses.fabNewPost}
                color="primary"
                aria-label="New post"
                onClick={() => {
                  setCurrentId(null);
                  setComposerOpen(true);
                }}
              >
                <Add />
              </Fab>
            )}
            <Dialog
              open={composerOpen}
              onClose={closeComposer}
              maxWidth="sm"
              fullWidth
              scroll="body"
            >
              <DialogContent>
                <Form
                  currentId={currentId}
                  setCurrentId={(id) => {
                    setCurrentId(id);
                    if (id === null) setComposerOpen(false);
                  }}
                  groupId={groupId}
                  variant="dialog"
                />
              </DialogContent>
            </Dialog>
          </>
        )}
      </Box>
    </Grow>
  );
};

export default GroupWall;
