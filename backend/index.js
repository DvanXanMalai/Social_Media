import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import likeRoutes from './routes/like.js';
import followRoutes from './routes/follow.js';
import postRoutes from './routes/post.js';

dotenv.config();
const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true,
  }),
);
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes);

//Like routes
app.use('/api/like', likeRoutes);

//Follow routes
app.use('/api/follow', followRoutes);

//Post routes
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
