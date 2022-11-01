import 'dotenv/config';
import mongoose from 'mongoose';
import logger from './logger';

const MONGO_DB_URL = 'mongodb://root:docker@db/todo?authSource=admin';

const connectToDatabase = async (
  mongoUrl = process.env.DATABASE_URL || MONGO_DB_URL
): Promise<void> => {
  try {
    logger.info('Connecting to database');
    await mongoose.connect(mongoUrl);
    logger.info('Connected with success');
  } catch (err) {
    logger.fatal(`Error to connect with database: ${err}`);
  }
};

export default connectToDatabase;
