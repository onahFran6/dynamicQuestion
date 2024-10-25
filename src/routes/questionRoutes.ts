import { Router } from 'express';
import { fetchAssignedQuestionForUser } from '../controllers/questionController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/question', authenticateToken, fetchAssignedQuestionForUser);

export default router;
