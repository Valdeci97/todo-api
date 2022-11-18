import { hash, compare } from 'bcryptjs';
import { HashHandler } from '../interfaces/HashHandler';

export default class HashProvider implements HashHandler {
  private hashSalts = 10;

  public async hashPayload(payload: string): Promise<string> {
    return hash(payload, this.hashSalts);
  }

  // eslint-disable-next-line class-methods-use-this
  public async compareHash(
    payload: string,
    hashString: string
  ): Promise<boolean> {
    return compare(payload, hashString);
  }
}
