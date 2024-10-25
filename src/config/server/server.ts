import { Server, createServer } from 'http';
import { Express } from 'express';
import logger from '../logger';
import { ServerConfig } from 'src/types/serverTypes';
import connectDB from '../database';

export const createServerInstance = (app: Express, config: ServerConfig) => {
  const server = createServer(app);
  let shutdownInProgress = false;

  const shutdown = async (): Promise<void> => {
    if (shutdownInProgress) return;
    shutdownInProgress = true;

    let shutdownTimeout: NodeJS.Timeout;

    try {
      shutdownTimeout = setTimeout(() => {
        logger.error('💥 Forceful shutdown initiated due to timeout');
        process.exit(1);
      }, config.shutdownTimeout);

      await new Promise<void>((resolve) => {
        server.close(() => {
          logger.info('✅ HTTP server closed');
          resolve();
        });
      });
      clearTimeout(shutdownTimeout);
      process.exit(0);
    } catch (error) {
      logger.error('❌ Error during shutdown:', error);
      clearTimeout(shutdownTimeout!);
      process.exit(1);
    }
  };

  const setupShutdownHandlers = () => {
    const shutdownHandler = (signal: string) => {
      logger.info(`Received ${signal}, initiating graceful shutdown...`);
      shutdown();
    };

    process.on('SIGTERM', () => shutdownHandler('SIGTERM'));
    process.on('SIGINT', () => shutdownHandler('SIGINT'));
    process.on('uncaughtException', (error) => {
      logger.error('💥 Uncaught Exception:', error);
      shutdownHandler('uncaughtException');
    });
    process.on('unhandledRejection', (reason) => {
      logger.error('💥 Unhandled Rejection:', reason);
      shutdownHandler('unhandledRejection');
    });
  };

  const start = async (): Promise<Server> => {
    // await db.connect();
    // Connect to the database
    await connectDB();

    return new Promise((resolve) => {
      server.listen(config.port, () => {
        logger.info(`🚀 Server running on port ${config.port}`);
        setupShutdownHandlers();
        resolve(server);
      });
    });
  };

  return {
    start,
    shutdown,
  };
};
