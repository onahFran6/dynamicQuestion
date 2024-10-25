import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { limiter } from './middlewares/rateLimiter';
import { useCors } from './middlewares/cors';
import { ipWhitelist } from './middlewares/ipWhitelist';
import { errorHandler } from './middlewares/errorHandler';
import { configureSecurityMiddleware } from './middlewares/security';
import config from './config/dotenv';
import questionRoutes from './routes/questionRoutes';
import authRoutes from './routes/authRoutes';

const app = express();

// Basic middleware
app.set('port', config.port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure security middleware
configureSecurityMiddleware(app);

// Custom middleware
app.use(limiter);
app.use(useCors);
app.use(ipWhitelist);

// Static files
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1y' }));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/v1/questions', questionRoutes);
app.use('/api/v1/auth', authRoutes);

// Error handling
app.use(errorHandler);

export default app;
