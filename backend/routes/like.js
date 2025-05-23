import express from 'express';
import { likePost, unlikePost } from '../controllers/likeController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:postId', authenticateToken, likePost);
router.delete('/:postId', authenticateToken, unlikePost);

export default router;