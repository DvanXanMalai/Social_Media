import pool from '../config/db.js'

export const getFeed = async (req, res) => {
    const user_id = req.user.id
    const { page = 1, limit = 10 } = req.query
    const offset = (page - 1) * limit
    try {
        const feed = await pool.query(
            `SELECT p.id,p.content,p.image,p.created_at,u.username,u.profile_pic FROM posts p JOIN follows f ON p.user_id=f.following_id JOIN social_media.users u ON p.user_id=u.id WHERE f.follower_id=$1
            ORDER BY p.created_at DESC
            LIMIT $2 OFFSET $3`, [user_id, limit, offset]
        )
        res.json(feed.rows)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
}