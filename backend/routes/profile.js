import express from 'express';
import authenticateToken from '../middleware/authMiddleware.js';
import { getProfile, updateProfile } from '../controllers/profileController.js';

const router = express.Router();

//get profile
router.get('/', authenticateToken, getProfile);
router.put('/', authenticateToken, updateProfile);

export default router;
