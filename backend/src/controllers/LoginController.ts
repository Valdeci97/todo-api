import { Response, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException';
import { RequestWithBody } from '../interfaces/RequestWithBody';
import { User } from '../interfaces/UserInterface';
import LoginService from '../services/LoginService';

export default class LoginController {
  private service: LoginService;

  private route: string;

  constructor(service: LoginService = new LoginService(), route = '/login') {
    this.service = service;
    this.route = route;
  }

  public getRoute(): string {
    return this.route;
  }

  public login = async (
    req: RequestWithBody<User>,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const result = await this.service.login(req.body);
      return res.status(200).json({ login: result });
    } catch (err) {
      console.log(err);
      if (err instanceof HttpException) {
        return next(new HttpException(err.status, err.message));
      }
      next(new HttpException());
    }
  };
}
