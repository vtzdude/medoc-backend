import express from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import {
  validateLoginRequest,
  validateSignupRequest,
} from '../middleware/authMiddleware';
const router = express.Router();
// Authentication
router.post('/register', validateSignupRequest, registerUser);
router.post('/login', validateLoginRequest, loginUser);

export default router;
