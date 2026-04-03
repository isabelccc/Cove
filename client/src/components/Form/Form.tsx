import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from '@material-ui/core';
import AddPhotoAlternateOutlined from '@material-ui/icons/AddPhotoAlternateOutlined';
import LockOutlined from '@material-ui/icons/LockOutlined';
import GroupOutlined from '@material-ui/icons/GroupOutlined';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';
import { RootState, Post, FormProps, PostFormState, Profile } from '../../types';

const emptyForm: PostFormState = {
  title: '',
  message: '',
  tags: [],
  selectedFile: '',
};

const Form: React.FC<FormProps> = ({
  currentId,
  setCurrentId,
  groupId,
  variant = 'page',
}) => {
  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();

  const [postData, setPostData] = useState<PostFormState>(emptyForm);

  const post = useSelector((state: RootState) =>
    (currentId ? state.posts.posts.find((p: Post) => p._id === currentId) : null),
  );

  const rawProfile = localStorage.getItem('profile');
  const user: Profile | null = rawProfile ? JSON.parse(rawProfile) : null;

  const clear = () => {
    setCurrentId(null);
    setPostData(emptyForm);
  };

  useEffect(() => {
    if (currentId && post) {
      setPostData({
        title: post.title ?? '',
        message: post.message ?? '',
        tags: post.tags ?? [],
        selectedFile: post.selectedFile ?? '',
      });
    } else if (!currentId) {
      setPostData(emptyForm);
    }
  }, [currentId, post, groupId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const name = user?.result?.name;

    if (!name) return;

    if (!currentId) {
      if (!groupId) return;
      dispatch(createPost({ ...postData, name, groupId }, { push: history.push }));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.emptyCard} elevation={0}>
        <LockOutlined className={classes.emptyIcon} />
        <Typography variant="h6" gutterBottom>
          Sign in to post
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Posts in your circles are private. Sign in to share a photo with people you trust.
        </Typography>
      </Paper>
    );
  }

  if (!currentId && !groupId) {
    return (
      <Paper className={classes.emptyCard} elevation={0}>
        <GroupOutlined className={classes.emptyIcon} />
        <Typography variant="h6" gutterBottom>
          Choose a circle first
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Open one of your circles, then add a post there. Nothing is shared across circles.
        </Typography>
      </Paper>
    );
  }

  const handleAddChip = (tag: string) => {
    setPostData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
  };

  const handleDeleteChip = (chipToDelete: string) => {
    setPostData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== chipToDelete),
    }));
  };

  const hasImage = Boolean(
    postData.selectedFile && postData.selectedFile.length > 0,
  );
  const isEdit = Boolean(currentId);

  const cardClass = variant === 'dialog' ? `${classes.card} ${classes.cardDialog}` : classes.card;

  return (
    <Paper className={cardClass} elevation={0}>
      <div className={classes.accentBar} aria-hidden />
      <Box className={classes.body}>
        <div className={classes.header}>
          <Typography variant="h6" className={classes.headerTitle}>
            {isEdit ? 'Edit post' : 'New post'}
          </Typography>
          <Typography className={classes.headerHint} component="p">
            {isEdit
              ? 'Update the caption, tags, or photo for this memory.'
              : 'Add a photo and a short caption. Only members of this circle can see it.'}
          </Typography>
        </div>

        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box className={classes.dropZone}>
            <Box className={classes.dropZoneLabel}>
              <AddPhotoAlternateOutlined color="primary" />
              <span>Photo</span>
            </Box>
            {hasImage ? (
              <Box className={classes.previewWrap}>
                <img
                  className={classes.preview}
                  src={postData.selectedFile}
                  alt="Selected for upload"
                />
              </Box>
            ) : null}
            <div className={classes.fileInput}>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }: { base64: string }) =>
                  setPostData((prev) => ({ ...prev, selectedFile: base64 }))}
              />
            </div>
            <Typography variant="caption" color="textSecondary" display="block">
              JPG or PNG, a few MB is fine.
            </Typography>
          </Box>

          <Box className={classes.field}>
            <TextField
              name="title"
              variant="outlined"
              label="Title (optional)"
              fullWidth
              value={postData.title}
              onChange={(e) => setPostData((prev) => ({ ...prev, title: e.target.value }))}
            />
          </Box>

          <Box className={classes.field}>
            <TextField
              id="form-message"
              name="message"
              variant="outlined"
              label="Caption"
              placeholder="What was the moment?"
              fullWidth
              multiline
              rows={4}
              value={postData.message}
              onChange={(e) => setPostData((prev) => ({ ...prev, message: e.target.value }))}
            />
          </Box>

          <Box className={classes.chipWrap}>
            <ChipInput
              variant="outlined"
              label="Tags (optional)"
              fullWidth
              value={postData.tags}
              onAdd={(chip) => handleAddChip(chip as string)}
              onDelete={(chip) => handleDeleteChip(chip as string)}
            />
          </Box>

          <Box className={classes.actions}>
            <Button
              className={classes.submitBtn}
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              fullWidth
            >
              {isEdit ? 'Save changes' : 'Post to this circle'}
            </Button>
            <Button
              className={classes.resetBtn}
              variant="text"
              color="default"
              onClick={clear}
              fullWidth
            >
              {isEdit ? 'Cancel edit' : 'Reset form'}
            </Button>
          </Box>
        </form>
      </Box>
    </Paper>
  );
};

export default Form;
