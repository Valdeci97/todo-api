export interface HashHandler {
  hashPayload(payload: string): Promise<string>;
  compareHash(payload: string, hashString: string): Promise<boolean>;
}
