import pool from '../config/db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import generateToken from '../utils/generateToken.js'

export const signUp = async (req, res) => {
    const { username, email, password } = req.body

    try {
        const userExists = await pool.query('SELECT * FROM social_media.users WHERE email=$1', [email])

        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: 'User already exists' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await pool.query(
            'INSERT INTO social_media.users (username,email,password) VALUES($1,$2,$3) RETURNING id,username,email', [username, email, hashedPassword]
        )

        const token = generateToken(newUser.rows[0].id, newUser.rows[0].username)

        res.status(201).json({
            message: 'User registered sucessfully',
            user: newUser.rows[0],
            token,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server erro' })

    }
}

export const Login = async (req, res) => {
    const { emailOrUsername, password } = req.body;
    try {
        //Check if input is an email (contains'@') or a username
        const isEmail = emailOrUsername.includes('@')
        const user = await pool.query(`SELECT * FROM users WHERE ${isEmail ? 'email' : 'username'}=$1`, [emailOrUsername])
        if (user.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }
        const validPassword = await bcrypt.compare(password, user.rows[0].password)
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }
        const token = generateToken(user.rows[0].id, user.rows[0].username)
        res.status(200).json({
            message: 'Login sucessful',
            token,
        })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
}