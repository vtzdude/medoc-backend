import express from 'express';

import { validateLoginRequest } from '../middleware/authMiddleware';
import {
  getAllUsers,
  getUserById,
  deleteUser,
  getNotes,
  adminLogin,
  getAuditLogs,
} from '../controllers/adminController';

const router = express.Router();

router.post('/login', validateLoginRequest, adminLogin);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.delete('/users/:id', deleteUser);
router.get('/audit/notes/:page', getNotes);
router.get('/logs/:page', getAuditLogs);

export default router;
