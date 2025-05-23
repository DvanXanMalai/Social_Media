import express from 'express'
import {
    createPost, getFeed, getUserPosts, deletePost,
} from '../controllers/postController.js'

import authenticateToken from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', authenticateToken, createPost)
router.get('/feed', authenticateToken, getFeed)
router.get('/:userId/posts', authenticateToken, getUserPosts)
router.delete('/:postId', authenticateToken, deletePost)

export default router