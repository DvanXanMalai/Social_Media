import pool from '../config/db.js';

export const likePost = async (req, res) => {
    const { post_id } = req.body;
    const user_id = req.user.id;

    try {
        const existingLike = await pool.query(
            'SELECT * FROM social_media.likes WHERE user_id=$1 AND post_id=$2',
            [user_id, post_id]
        );

        if (existingLike.rows.length > 0) {
            return res.status(400).json({ message: 'You have already liked this post' });
        }

        const newLike = await pool.query(
            'INSERT INTO likes (user_id,post_id) VALUES ($1,$2) RETURNING *',
            [user_id, post_id]
        );

        res.json(newLike.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const unlikePost = async (req, res) => {
    const { post_id } = req.body;
    const user_id = req.user.id;

    try {
        const result = await pool.query(
            'DELETE FROM likes WHERE user_id=$1 AND post_id=$2 RETURNING *',
            [user_id, post_id]
        );
        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'You havent liked this post' });
        }
        res.json({ message: 'Post unliked sucessfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
