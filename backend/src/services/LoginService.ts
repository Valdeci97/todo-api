import HttpException from '../exceptions/HttpException';
import { LoginInterface, LoginResponse } from '../interfaces/LoginInterface';
import { CrudModel } from '../interfaces/CrudModelInterface';
import { User } from '../interfaces/UserInterface';
import UserModel from '../models/UserModel';
import jsonWebToken from '../utils/jwt';
import { HashHandler } from '../interfaces/HashHandler';
import HashProvider from '../utils/HashProvider';

export default class LoginService implements LoginInterface<User> {
  private model: CrudModel<User>;

  private hashHandler: HashHandler;

  constructor(
    model: CrudModel<User> = new UserModel(),
    hashHandler: HashHandler = new HashProvider()
  ) {
    this.model = model;
    this.hashHandler = hashHandler;
  }

  public async login(obj: User): Promise<LoginResponse> {
    const dbUser = await this.model.findByEmail(obj.email);
    if (!dbUser) throw new HttpException(400, 'E-mail or password incorrect');
    const isSamePassword = await this.hashHandler.compareHash(
      obj.password,
      dbUser.password
    );
    if (!isSamePassword) {
      throw new HttpException(400, 'E-mail or password incorrect');
    }
    const userId = dbUser._id.toString();
    const token = jsonWebToken.generate({ id: userId });
    return {
      user: { id: userId, name: dbUser.name, email: dbUser.email },
      token,
    };
  }
}
