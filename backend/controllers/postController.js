// controllers/postController.js
import pool from '../config/db.js';

export const createPost = async (req, res) => {
    const { content } = req.body;
    const userId = req.user.id;

    let imageUrl = null;
    if (req.file) {
        imageUrl = `/uploads/${req.file.filename}`;
    }

    try {
        const result = await pool.query(
            'INSERT INTO posts (user_id, content, image_url) VALUES ($1, $2, $3) RETURNING id, content, image_url, created_at',
            [userId, content, imageUrl]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating post' });
    }
};

export const getPosts = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT p.id, p.content, p.image_url, p.created_at, u.username FROM posts p JOIN users u ON p.user_id = u.id ORDER BY p.created_at DESC'
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching posts' });
    }
};