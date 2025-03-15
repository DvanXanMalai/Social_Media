import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (userId, username) => {
    return jwt.sign({ id: userId, username }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export default generateToken;
