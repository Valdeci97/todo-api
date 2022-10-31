import express, { Router } from 'express';
import cors from 'cors';
import logger from './logger';
import connectToDatabase from './connection';

export default class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
  }

  public async start(PORT: number | string = 3001): Promise<void> {
    await connectToDatabase();
    this.app.listen(PORT, () => logger.info(`Server running at port: ${PORT}`));
  }

  public addRouter(router: Router): void {
    this.app.use(router);
  }

  public getApp(): express.Application {
    return this.app;
  }
}
