import mongoose, { ConnectOptions, Mongoose } from 'mongoose';
import ConnectionDriver from './ConnectionDriver';
import logger from '../config/logger';

export default class MongoDBConnectionDriver
  implements ConnectionDriver<Mongoose>
{
  private uri: string;

  private options?: ConnectOptions;

  constructor(uri: string, options?: ConnectOptions) {
    this.uri = uri;
    this.options = options;
    this.initLogger();
  }

  connect(): Promise<Mongoose> {
    return mongoose.connect(this.uri, this.options);
  }

  disconnect(): Promise<void> {
    return mongoose.disconnect();
  }

  getConnection(): Promise<Mongoose> {
    return new Promise((res) => res);
  }

  private initLogger(): void {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', (collectionName, method, query, doc) => {
        logger.info(
          `Mongoose: ${collectionName}.${method}`,
          JSON.stringify(query),
          doc
        );
      });
    }
  }
}
