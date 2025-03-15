import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'

const userRouter = express.Router()

userRouter.get('/me', authMiddleware, (req, res) => {
    res.json({ id: req.user.id, username: req.user.username })
})
export default userRouter