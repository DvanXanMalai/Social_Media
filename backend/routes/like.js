import express from 'express';
import { likePost, unlikePost } from '../controllers/likeController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/like/:postId/:userId', authenticateToken, likePost);
router.post('/unlike/:postId/:usedId', authenticateToken, unlikePost);

export default router;
