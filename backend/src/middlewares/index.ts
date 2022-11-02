import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException';

export default class GlobalMiddleware {
  public errorHandler = (
    err: HttpException,
    _req: Request,
    res: Response,
    _next: NextFunction
  ): Response => {
    return res.status(err.status).json({ message: err.message });
  };
}
