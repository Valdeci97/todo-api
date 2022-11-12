import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException';
import { RequestWithBody } from '../interfaces/RequestWithBody';
import { Task } from '../interfaces/TaskInterface';
import RelationService from '../services/RelationService';
import TaskService from '../services/TaskService';
import jsonWebToken from '../utils/jwt';

export default class TaskController {
  private service: RelationService<Task>;

  private route: string;

  constructor(
    service: TaskService = new TaskService(),
    route: string = '/tasks'
  ) {
    this.service = service;
    this.route = route;
  }

  public getRoute(): string {
    return this.route;
  }

  public create = async (
    req: RequestWithBody<Task>,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const task = await this.service.create(req.body);
      return res.status(201).json({ task });
    } catch (err) {
      if (err instanceof HttpException) {
        return next(err);
      }
      next(new HttpException());
    }
  };

  public read = async (
    req: RequestWithBody<Task>,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { authorization } = req.headers;
    if (!authorization) return next(new HttpException(404, 'token not found'));
    try {
      const [, auth] = authorization.split(' ');
      const token = jsonWebToken.decode(auth);
      const tasks = await this.service.read(token.id);
      return res.status(200).json(tasks);
    } catch (err) {
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
      const task = await this.service.readOne(id);
      return res.status(200).json({ task });
    } catch (err) {
      if (err instanceof HttpException) {
        return next(err);
      }
      next(new HttpException());
    }
  };

  public update = async (
    req: RequestWithBody<Task>,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { id } = req.params;
    try {
      const task = await this.service.update(id, req.body);
      return res.status(200).json({ task });
    } catch (err) {
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
      return res.status(204).end();
    } catch (err) {
      if (err instanceof HttpException) {
        return next(err);
      }
      next(new HttpException());
    }
  };
}
