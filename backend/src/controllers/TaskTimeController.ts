import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException';
import { Task } from '../interfaces/TaskInterface';
import RelationTimeService from '../services/RelationTimeService';
import TaskTimeService from '../services/TaskTimeService';

export default class TaskTimeController {
  private service: RelationTimeService<Task>;

  private route: string;

  constructor(
    service: TaskTimeService = new TaskTimeService(),
    route = '/tasks'
  ) {
    this.service = service;
    this.route = route;
  }

  public getRoute(): string {
    return this.route;
  }

  public todayTasks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { id } = req.params;
    try {
      const tasks = await this.service.findByDay(id);
      return res.status(200).json(tasks);
    } catch (err) {
      if (err instanceof HttpException) {
        return next(err);
      }
      next(new HttpException());
    }
  };

  public weekTasks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { id } = req.params;
    try {
      const tasks = await this.service.findByWeek(id);
      return res.status(200).json(tasks);
    } catch (err) {
      if (err instanceof HttpException) {
        return next(err);
      }
      next(new HttpException());
    }
  };

  public monthTasks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { id } = req.params;
    try {
      const tasks = await this.service.findByDay(id);
      return res.status(200).json(tasks);
    } catch (err) {
      if (err instanceof HttpException) {
        return next(err);
      }
      next(new HttpException());
    }
  };

  public yearTasks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { id } = req.params;
    try {
      const tasks = await this.service.findByYear(id);
      return res.status(200).json(tasks);
    } catch (err) {
      if (err instanceof HttpException) {
        return next(err);
      }
      next(new HttpException());
    }
  };

  public lateTasks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { id } = req.params;
    try {
      const tasks = await this.service.findLate(id);
      return res.status(200).json(tasks);
    } catch (err) {
      if (err instanceof HttpException) {
        return next(err);
      }
      next(new HttpException());
    }
  };
}
