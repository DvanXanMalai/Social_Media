import express from 'express';
import { signUp, Login } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/signup', signUp);
authRouter.post('/login', Login);

export default authRouter;
