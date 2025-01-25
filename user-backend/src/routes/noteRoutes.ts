import express from 'express';
import {
  validateNoteCreationRequest,
  validateNoteUpdateRequest,
} from '../middleware/authMiddleware';
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from '../controllers/noteController';
import { jwtMiddleware } from '../middleware/jwtMiddleware';

const router = express.Router();
// Notes
router.get('/:page', jwtMiddleware, getNotes);
router.post('/', jwtMiddleware, validateNoteCreationRequest, createNote);
router.patch('/:id', jwtMiddleware, validateNoteUpdateRequest, updateNote);
router.delete('/:id', jwtMiddleware, deleteNote);
export default router;
