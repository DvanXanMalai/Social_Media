import express from 'express';
import authenticateToken from '../middleware/authMiddleware.js';
import { getUsers } from '../controllers/usersController.js';

const router = express.Router();

//get profile
router.get('/', authenticateToken, getUsers);

export default router;
