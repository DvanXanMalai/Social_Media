// routes/postRouter.js
import express from 'express';
import multer from 'multer';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createPost, getPosts } from '../controllers/postController.js';
import { likePost, unlikePost } from '../controllers/likeController.js';

const postRouter = express.Router();

// Setup multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });

// Route to create a post
postRouter.post('/', authMiddleware, upload.single('image'), createPost);

// Route to get all posts
postRouter.get('/', authMiddleware, getPosts);

//Route to like a post
postRouter.post('/like', authMiddleware, likePost);

//Route to unlike a post
postRouter.post('/unlike', authMiddleware, unlikePost);

export default postRouter;
