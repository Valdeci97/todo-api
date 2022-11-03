import { compare } from 'bcryptjs';
import HttpException from '../exceptions/HttpException';
import { LoginInterface, LoginResponse } from '../interfaces/LoginInterface';
import { Model } from '../interfaces/ModelInterface';
import { User } from '../interfaces/UserInterface';
import UserModel from '../models/UserModel';

export default class LoginService implements LoginInterface<User> {
  private model: Model<User>;

  constructor(model: Model<User> = new UserModel()) {
    this.model = model;
  }

  public async login(obj: User): Promise<LoginResponse> {
    const dbUser = await this.model.findByEmail(obj.email);
    if (!dbUser) throw new HttpException(400, 'E-mail or password incorrect');
    const isSamePassword = await this.comparePassword(
      obj.password,
      dbUser.password
    );
    if (!isSamePassword) {
      throw new HttpException(400, 'E-mail or password incorrect');
    }
    dbUser.password = '';
    return { user: dbUser, token: '' };
  }

  // eslint-disable-next-line class-methods-use-this
  private async comparePassword(
    clientPassword: string,
    dbPassword: string
  ): Promise<boolean> {
    return compare(clientPassword, dbPassword);
  }
}
