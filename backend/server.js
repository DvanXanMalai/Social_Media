import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pool from './config/db.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import postRouter from './routes/postRoute.js';
import followRouter from './routes/followRoute.js';
import commentRoute from './routes/commentRoute.js';
import profileRouter from './routes/profileRoute.js';

dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Routes
app.use('/auth', authRouter);

app.use('/user', userRouter);

app.use('/posts', postRouter);

app.use('/account', followRouter)

app.use('/posts/comments', commentRoute)

app.use('/profile', profileRouter)
app.use('/uploads/profile_pics', express.static('uploads/profile_pics')) //serve images

app.get('/', async (req, res) => {
    const response = await pool.query('SELECT * FROM social_media.users');
    res.status(200).send(response.rows);
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
