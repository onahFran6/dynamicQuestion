import { ConnectOptions } from 'mongoose';

export interface DatabaseConfig {
  url: string;
  options: ConnectOptions;
}

export interface DatabaseConnection {
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  ping: () => Promise<boolean>;
}
