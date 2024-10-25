// src/routes/authRoutes.ts
import express from 'express';
import { login, register } from '../controllers/authController';

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

export default router;
