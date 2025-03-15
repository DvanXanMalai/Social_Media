import pool from '../config/db.js';

export const followUser = async (req, res) => {
    const { following_id } = req.body;
    const follower_id = req.user.id;

    try {
        //prevent a user form following themseleves
        if (follower_id === following_id) {
            return res.status(400).json({ message: 'You cannot follow yourself' });
        }
        //check if the user is already following the user
        const existingFollow = await pool.query(
            'SELECT * FROM follows WHERE follower_id=$1 AND following_id=$2 ',
            [follower_id, following_id]
        );
        if (existingFollow.rows.length > 0) {
            return res.status(400).json({ message: 'You are already following this user' });
        }

        const newFollow = await pool.query(
            'INSERT INTO follows (follower_id,following_Id) VALUES ($1,$2) RETURNING *',
            [follower_id, following_id]
        );
        res.json(newFollow.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server Error' });
    }
};

//unfollowing controller
export const unfollowUser = async (req, res) => {
    const { following_id } = req.body;
    const follower_id = req.user.id;

    try {
        //remove the follow relationship
        const result = await pool.query(
            'DELETE FROM follows WHERE follower_id=$1 AND following_id=$2 RETURNING *', [follower_id, following_id]
        )
        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'You are not following this user.' })
        }
        res.json({ message: 'Unfollowed user sucessfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}