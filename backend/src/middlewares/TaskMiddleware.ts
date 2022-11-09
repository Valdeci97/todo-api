import { Request, Response, NextFunction } from 'express';
import {
  userId,
  category,
  title,
  description,
  when,
  done,
} from '../utils/joiSchemas/taskSchema';

export default class TaskMiddleware {
  public validateUserId = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    const { error } = userId.validate(req.body);
    if (error) {
      const [code, message] = error.message.split('/');
      return res.status(Number(code)).json({ message });
    }
    next();
  };

  public validateCategory = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    const { error } = category.validate(req.body);
    if (error) {
      const [code, message] = error.message.split('/');
      return res.status(Number(code)).json({ message });
    }
    next();
  };

  public validateTitle = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    const { error } = title.validate(req.body);
    if (error) {
      const [code, message] = error.message.split('/');
      return res.status(Number(code)).json({ message });
    }
    next();
  };

  public validateDescription = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    const { error } = description.validate(req.body);
    if (error) {
      const [code, message] = error.message.split('/');
      return res.status(Number(code)).json({ message });
    }
    next();
  };

  public validateWhen = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    const { error } = when.validate(req.body);
    if (error) {
      const [code, message] = error.message.split('/');
      return res.status(Number(code)).json({ message });
    }
    next();
  };

  public validateDone = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    const { error } = done.validate(req.body, { convert: false });
    if (error) {
      const [code, message] = error.message.split('/');
      return res.status(Number(code)).json({ message });
    }
    next();
  };
}
