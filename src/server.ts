import app from './app';
import logger from './config/logger';
import { serverConfig } from './config/server/config';
import { createServerInstance } from './config/server/server';

const startApplication = async () => {
  try {
    const server = createServerInstance(app, serverConfig);
    await server.start();
  } catch (error) {
    logger.error('Failed to start application:', error);
    process.exit(1);
  }
};

startApplication();
