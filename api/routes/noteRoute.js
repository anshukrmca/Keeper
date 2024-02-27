import express from 'express';
import { AddNote, deleteNoteByid, getNotebyUser } from '../controllers/noteController.js';

const router = express.Router();

router.post('/', AddNote);
router.get('/:id', getNotebyUser);
router.delete('/:id', deleteNoteByid);

export default router;