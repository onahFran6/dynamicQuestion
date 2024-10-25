import { Request, Response, NextFunction } from 'express';
import { getAssignedQuestion } from '../services/questionService';
import { RequestUserAuth } from '../types/generalTypes';

// Get assigned question for the logged-in user.
export const fetchAssignedQuestionForUser = async (
  req: RequestUserAuth,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.userId;
    const question = await getAssignedQuestion(userId);

    res.status(200).json({ question });
  } catch (error) {
    next(error);
  }
};
