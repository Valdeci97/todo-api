import { Request, Response, NextFunction } from 'express';
import { uuidSchema } from '../utils/joiSchemas/uuid';

export default class GuidMiddleware {
  public validateGuid = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    const { error } = uuidSchema.validate(req.params.id);
    if (error) {
      console.log(error);
      const [code, message] = error.message.split('/');
      return res.status(Number(code)).json({ message });
    }
    next();
  };
}
