import express from 'express'
import { addComment, getComments, deleteComment } from '../controllers/commentController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const commentRoute = express.Router()

//Route to add a comment
commentRoute.post('/', authMiddleware, addComment)

//Route to get all comments for a post
commentRoute.get('/:post_id', getComments)

//Route to delete a comment
commentRoute.delete('/:comment_id', authMiddleware, deleteComment)

export default commentRoute