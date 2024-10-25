import { RedisClientType } from 'redis';

export interface RedisConfig {
  url: string;
  ttl: number;
  reconnectStrategy: {
    maxRetries: number;
    initialDelay: number;
    maxDelay: number;
  };
}
