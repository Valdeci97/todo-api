import { User } from './UserInterface';

export type LoginResponse = {
  user: User;
  token: string;
};

export interface LoginInterface<T> {
  login(obj: T): Promise<LoginResponse>;
}
