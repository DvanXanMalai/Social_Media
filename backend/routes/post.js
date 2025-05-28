import express from 'express';
import {
  createPost,
  getFeed,
  getUserPosts,
  deletePost,
} from '../controllers/postController.js';
import { getAllPosts } from '../controllers/getAllPosts.js';

import authenticateToken from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, upload.single('image'), createPost);
router.get('/feed', authenticateToken, getFeed);
router.get('/all', authenticateToken, getAllPosts);
router.get('/:userId/posts', getUserPosts);
router.delete('/:postId', authenticateToken, deletePost);

export default router;
