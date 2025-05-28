import express from 'express';
import authenticateToken from '../middleware/authMiddleware.js';
import {
  getProfile,
  getMyProfile,
  updateProfile,
} from '../controllers/profileController.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

//get profile
router.get('/me', authenticateToken, getMyProfile);
router.get('/:userId', authenticateToken, getProfile);

//update profile
router.put('/', authenticateToken, upload.single('image'), updateProfile);

export default router;
