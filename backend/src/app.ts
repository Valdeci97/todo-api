import express, { ErrorRequestHandler, Router } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import logger from './logger';
import connectToDatabase from './connection';
import GlobalMiddleware from './middlewares';
import swaggerDocument from './utils/swagger/swagger.json';
import RateLimiter from './middlewares/RateLimiter';

export default class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
    this.setupDocumentation();
    this.app.use(RateLimiter.createRateLimiter());
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

  public addErrorMiddleware(
    middleware: ErrorRequestHandler = new GlobalMiddleware().errorHandler
  ): void {
    this.app.use(middleware);
  }

  private setupDocumentation(): void {
    this.app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }
}
