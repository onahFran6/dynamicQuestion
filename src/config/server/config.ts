import { ServerConfig } from 'src/types/serverTypes';
import dotenv from '../dotenv';

export const serverConfig: ServerConfig = {
  port: dotenv.port,
  shutdownTimeout: 10000,
  healthCheckInterval: 30000,
};
