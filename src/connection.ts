import 'dotenv/config';
import mongoose from 'mongoose';
import logger from './logger';

const MONGODB_URL = 'mongodb://root:docker@db/todo?authSource=admin';
const MONGODB_URI = process.env.MONGODB_URI || MONGODB_URL;

export default async function connectToDatabase(): Promise<void> {
  try {
    logger.info('Connecting to database');
    await mongoose.connect(MONGODB_URI);
    logger.info('Connected with success');
  } catch (err) {
    logger.fatal(`Error connecting to database: ${err}`);
  }
}
