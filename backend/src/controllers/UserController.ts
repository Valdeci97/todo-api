import { Request, Response, NextFunction } from 'express';
import Controller from '.';
import HttpException from '../exceptions/HttpException';
import { RequestWithBody } from '../interfaces/RequestWithBody';
import { User } from '../interfaces/UserInterface';
import logger from '../logger';
import UserService from '../services/Userservice';

export default class UserController extends Controller<User> {
  private route: string;

  constructor(service = new UserService(), route: string = '/users') {
    super(service);
    this.route = route;
  }

  public getRoute(): string {
    return this.route;
  }

  public create = async (
    req: RequestWithBody<User>,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const user = await this.service.create(req.body);
      return res.status(this.statusCode.CREATED).json({ user });
    } catch (err) {
      logger.fatal(err);
      if (err instanceof HttpException) {
        return next(err);
      }
      next(new HttpException());
    }
  };

  public readOne = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { id } = req.params;
    try {
      const user = await this.service.readOne(id);
      return res.status(this.statusCode.OK).json({ user });
    } catch (err) {
      logger.fatal(err);
      if (err instanceof HttpException) {
        return next(err);
      }
      next(new HttpException());
    }
  };

  public update = async (
    req: RequestWithBody<User>,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { id } = req.params;
    try {
      const user = await this.service.update(id, req.body);
      return res.status(this.statusCode.OK).json({ user });
    } catch (err) {
      logger.fatal(err);
      if (err instanceof HttpException) {
        return next(err);
      }
      next(new HttpException());
    }
  };

  public delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { id } = req.params;
    try {
      await this.service.delete(id);
      return res.status(this.statusCode.NO_CONTENT).end();
    } catch (err) {
      logger.fatal(err);
      if (err instanceof HttpException) {
        return next(err);
      }
      next(new HttpException());
    }
  };
}
