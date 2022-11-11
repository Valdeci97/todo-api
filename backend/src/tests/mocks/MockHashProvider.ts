import { HashHandler } from '../../interfaces/HashHandler';

export default class MockHashProvider implements HashHandler {
  public async hashPayload(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(
    payload: string,
    hashString: string
  ): Promise<boolean> {
    return payload === hashString;
  }
}
