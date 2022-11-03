export interface User {
  [key: string]: string | object | Buffer;
  name: string;
  email: string;
  password: string;
}
