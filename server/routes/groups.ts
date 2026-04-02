import express from 'express';
import auth from '../middleware/auth.js';
import { createGroup, listMyGroups, getGroup, joinGroup } from '../controllers/groups.js';

const router = express.Router();

router.post('/', auth, createGroup);
router.get('/mine', auth, listMyGroups);
router.post('/join', auth, joinGroup);
router.get('/:id', auth, getGroup);

export default router;
