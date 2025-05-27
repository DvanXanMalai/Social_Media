import express from 'express';
import { likePost, unlikePost } from '../controllers/likeController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/like/:postId', authenticateToken, likePost);
router.post('/unlike/:postId', authenticateToken, unlikePost);

export default router;

