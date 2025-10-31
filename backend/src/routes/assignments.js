import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { createAssignment, listAssignments, submitAssignment, deleteAssignment } from '../controllers/assignments.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(listAssignments)
  .post(authorize('faculty', 'admin'), createAssignment);

router.post('/:id/submit', authorize('student'), submitAssignment);
router.delete('/:id', authorize('faculty', 'admin'), deleteAssignment);

export default router;


