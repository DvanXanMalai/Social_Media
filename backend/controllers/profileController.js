import pool from '../config/db.js';

export const getProfile = async (req, res) => {
    const { user_id } = req.params;

    try {
        const user = await pool.query(
            'SELECT id,username,email,bio,profile_pic FROM users WHERE id=$1',
            [user_id]
        );
        if (user.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.json(user.rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
};


export const updateProfile = async (req, res) => {
    const { bio } = req.body
    const user_id = req.user.id
    const profile_pic = req.file ? req.file.filename : null
    try {
        const updatedUser = await pool.query(
            'UPDATE users SET bio=COALESCE($1,bio),profile_pci=COALESCE($2,profile_pic)WHERE id=$3 RETURNING id,username,email,bio,profile_pic', [bio, profile_pic, user_id]
        )
        res.json(updatedUser.rows[0])
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' })
    }
}