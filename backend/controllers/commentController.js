import pool from '../config/db.js'

export const addComment = async (req, res) => {
    const { post_id, content } = req.body;
    const user_id = req.user.id

    try {
        if (!content.trim()) {
            return res.status(400).json({ message: 'comment cannot be empty' })
        }
        const newComment = await pool.query(
            'INSERT INTO comments (user_id,post_id,content) VALUES ($1,$2,$3) RETURNING *', [user_id, post_id, content]
        )
        res.json(newComment.rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server error' })
    }
}

export const getComments = async (req, res) => {
    const { post_id } = req.params;
    try {
        const comments = await pool.query(
            `SELECT c.id,c.content,c.created_at,u.username FROM comments c JOIN users u ON c.user_id=u.id WHERE c.post_id=$1 ORDER BY c.created_at DESC`, [post_id]
        )
        res.json(comments.rows)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const deleteComment = async (req, res) => {
    const { comment_id } = req.params;
    const user_id = req.user.id //to ensure user is deleting thier own comment

    try {
        const result = await pool.query(
            'DELETE FROM comments WHERE id=$1 AND user_id=$2 RETURNING *', [comment_id, user_id]
        )
        if (result.rows.length === 0) {
            return res.status(403).json({ message: 'you are not authorized to delete this comment' })
        }
        res.json({ message: 'comment deleted sucessfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
}