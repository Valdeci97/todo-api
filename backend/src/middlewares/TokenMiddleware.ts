import { Request, Response, NextFunction, response } from 'express';
import HttpException from '../exceptions/HttpException';
import JsonWebToken from '../utils/jwt';

export default class TokenMiddleware {
  public validate = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    const { authorization } = req.headers;
    if (!authorization) return next(new HttpException(404, 'token not found'));
    try {
      JsonWebToken.decode(authorization);
      next();
    } catch (err) {
      next(new HttpException(401, 'invalid token'));
    }
  };
}
