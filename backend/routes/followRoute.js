import express from 'express'
import { followUser, unfollowUser } from "../controllers/followController.js"
import authMiddleware from '../middlewares/authMiddleware.js'

const followRouter = express.Router()

followRouter.post('/follow', authMiddleware, followUser)

followRouter.post('/unfollow', authMiddleware, unfollowUser)

export default followRouter