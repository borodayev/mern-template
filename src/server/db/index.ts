import { Mongoose } from 'mongoose';
import ConnectionDriver from './ConnectionDriver';
import MongoDBConnectionDriver from './MongoDBConnectionDriver';

const ConnectionDriverFactory = (
  dbType: string
): ConnectionDriver<Mongoose> => {
  if (dbType === 'mongodb') {
    return new MongoDBConnectionDriver(process.env.MONGODB_URI || '');
  }

  throw new Error(`DB: ${dbType} is not supported`);
};

export default ConnectionDriverFactory(process.env.DB_TYPE || '');
