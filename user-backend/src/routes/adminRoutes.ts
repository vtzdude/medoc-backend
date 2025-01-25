import express from 'express';
import { getNotesAdmin } from '../controllers/noteController';
import {
  adminJwtMiddleware,
  adminLoginMiddleware,
} from '../middleware/jwtMiddleware';
import {
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
} from '../controllers/authController';

const router = express.Router();
router.post('/login', adminLoginMiddleware, loginUser);
router.get('/users', adminJwtMiddleware, getAllUsers);
router.get('/users/:id', adminJwtMiddleware, getUserById);
router.delete('/users/:id', adminJwtMiddleware, deleteUser);
router.get('/notes/:page', adminJwtMiddleware, getNotesAdmin);
export default router;
