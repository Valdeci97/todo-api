import { Request, NextFunction, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { RequestWithBody } from '../interfaces/RequestWithBody';
import CrudService from '../services';

export default abstract class Controller<T> {
  protected service: CrudService<T>;

  protected readonly statusCode = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    NOT_FOUND: 404,
  };

  constructor(service: CrudService<T>) {
    this.service = service;
  }

  public abstract create(
    _req: RequestWithBody<T>,
    _res: Response,
    _next: NextFunction
  ): any;

  public read = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<Array<Partial<T>>> | void> => {
    try {
      const obj = await this.service.read();
      return res.status(this.statusCode.OK).json(obj);
    } catch (err) {
      if (err instanceof HttpException) {
        return next(err);
      }
      next(new HttpException());
    }
  };

  public abstract readOne(
    _req: Request,
    _res: Response,
    _next: NextFunction
  ): any;

  public abstract update(
    _req: RequestWithBody<T>,
    _res: Response,
    _next: NextFunction
  ): any;

  public abstract delete(
    _req: Request,
    _res: Response,
    _next: NextFunction
  ): any;
}
