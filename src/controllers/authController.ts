import { Request, Response, NextFunction } from 'express';
import { loginUser, registerUser } from '../services/authService';
import { Region } from '../types/modelTypes';

// Register a new user
// Register a new user
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, region } = req.body;

    // Validate the region input
    if (!Object.values(Region).includes(region)) {
      res.status(400).json({ message: 'Invalid region provided' });
      return;
    }

    const user = await registerUser(email, password, region as Region);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    next(error);
  }
};

// Login user and generate JWT
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);
    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    next(error);
  }
};
