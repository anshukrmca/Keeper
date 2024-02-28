import express from 'express';
import { AddNote, deleteNoteByid, getNotebyUser } from '../controllers/noteController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/', AddNote);
router.get('/',verifyToken, getNotebyUser);
router.delete('/:id', deleteNoteByid);

export default router;