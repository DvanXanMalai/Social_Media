import express from 'express';
import {
    followUser,
    unFollowUser,
    getFollowers,
    getFollowing,
} from '../controllers/followController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:userId', authenticateToken, followUser);
router.delete('/:userId', authenticateToken, unFollowUser);
router.get('/followers/:userId', authenticateToken, getFollowers);
router.get('/following/:userId', authenticateToken, getFollowing);

export default router;
