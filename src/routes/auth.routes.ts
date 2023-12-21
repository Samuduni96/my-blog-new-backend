import express from 'express';
import * as authController from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/authentication.middleware';
import { registerUser } from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/logout', authenticateToken, authController.logoutUser);

export default router;