import { Router } from 'express';
import { createEntry, getEntries, getEntryById, updateEntryById, deleteEntryById } from '../controllers/entryController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticate, createEntry);
router.get('/', authenticate, getEntries);
router.get('/:id', authenticate, getEntryById);
router.put('/:id', authenticate, updateEntryById);
router.delete('/:id', authenticate, deleteEntryById);

export default router;