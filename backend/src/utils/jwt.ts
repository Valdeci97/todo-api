import 'dotenv/config';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import authConfig from './authConfig';

export default class jsonWebToken {
  public static generate(obj: string | object | Buffer): string {
    return sign(obj, authConfig.secret, {
      algorithm: 'HS512',
      expiresIn: authConfig.expiresIn,
    });
  }

  public static decode(token: string): string | JwtPayload {
    return verify(token, authConfig.secret);
  }
}
