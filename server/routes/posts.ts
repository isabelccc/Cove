import express from 'express';

import { getPosts, getPostsBySearch, getPostsByCreator, getPost, createPost, updatePost, likePost, commentPost, deletePost, editComment, deleteComment } from '../controllers/posts.js';

const router = express.Router();
import auth from '../middleware/auth.js';

router.get('/creator', auth, getPostsByCreator);
router.get('/search', auth, getPostsBySearch);
router.get('/', auth, getPosts);
router.get('/:id', auth, getPost);

router.post('/', auth,  createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', auth, commentPost);
router.patch('/:id/comment/:commentId', auth, editComment);
router.delete('/:id/comment/:commentId', auth, deleteComment);

export default router;