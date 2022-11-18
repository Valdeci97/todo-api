import { Token, TokenHandler } from '../../interfaces/TokenHandler';

export default class MockTokenHandler implements TokenHandler {
  generate(token: string | object | Buffer): string {
    return `token:${token}`;
  }
  decode(token: string): Token {
    if (token === 'inválido') throw new Error();
    return { id: '6363daa6ab1e71a12204e9e4', iat: 1, exp: 1 };
  }
}
