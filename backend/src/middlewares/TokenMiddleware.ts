import { Request, Response, NextFunction, response } from 'express';
import HttpException from '../exceptions/HttpException';
import { TokenHandler } from '../interfaces/TokenHandler';
import JsonWebToken from '../utils/jwt';

export default class TokenMiddleware {
  private tokenHandler: TokenHandler;

  constructor(tokenHandler: TokenHandler = new JsonWebToken()) {
    this.tokenHandler = tokenHandler;
  }

  public validate = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(404).json({ message: 'token not found' });
    }
    const [, token] = authorization.split(' ');
    try {
      this.tokenHandler.decode(token);
      next();
    } catch (err) {
      next(new HttpException(401, 'invalid token'));
    }
  };
}
