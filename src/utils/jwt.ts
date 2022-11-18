/* eslint-disable class-methods-use-this */
import 'dotenv/config';
import { sign, verify } from 'jsonwebtoken';
import { TokenHandler, Token } from '../interfaces/TokenHandler';
import authConfig from './authConfig';

export default class jsonWebToken implements TokenHandler {
  public generate(obj: string | object | Buffer): string {
    return sign(obj, authConfig.secret, {
      algorithm: 'HS512',
      expiresIn: authConfig.expiresIn,
    });
  }

  public decode(token: string): Token {
    return verify(token, authConfig.secret) as Token;
  }
}
