import 'dotenv/config';
import { sign, verify } from 'jsonwebtoken';
import authConfig from './authConfig';

type Token = { id: string; iat: number; exp: number };

export default class jsonWebToken {
  public static generate(obj: string | object | Buffer): string {
    return sign(obj, authConfig.secret, {
      algorithm: 'HS512',
      expiresIn: authConfig.expiresIn,
    });
  }

  public static decode(token: string): Token {
    return verify(token, authConfig.secret) as Token;
  }
}
