import express from 'express';
import {
  registerUser,
  loginUser,
  fetchProfile,
  validateToken,
} from '../controllers/authController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateToken, fetchProfile);
router.get('/validate-token', authenticateToken, validateToken);

export default router;
