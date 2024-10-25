import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Register a new user
export const registerUser = async (email: string, password: string, region: string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const user = await User.create({ email, password, region });
  return user;
};

// Login and generate a JWT token
export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
  return { token, user };
};

// Verify JWT Token
export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
