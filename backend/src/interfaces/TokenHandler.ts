export type Token = { id: string; iat: number; exp: number };

export interface TokenHandler {
  generate(token: string | object | Buffer): string;
  decode(token: string): Token;
}
