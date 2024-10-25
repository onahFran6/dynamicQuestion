import helmet from 'helmet';
import compression from 'compression';
import lusca from 'lusca';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { Express } from 'express';
import config from '../config/dotenv';

export const configureSecurityMiddleware = (app: Express): void => {
  // Basic security headers
  app.use(helmet());

  // Compression
  app.use(compression());

  // Lusca security
  app.use(lusca.xframe('SAMEORIGIN'));
  app.use(lusca.xssProtection(true));

  // CSRF protection
  // app.use(lusca.csrf());
};
