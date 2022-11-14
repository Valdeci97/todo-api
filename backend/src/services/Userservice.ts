import CrudService from '.';
import HttpException from '../exceptions/HttpException';
import { HashHandler } from '../interfaces/HashHandler';
import { User } from '../interfaces/UserInterface';
import UserModel from '../models/UserModel';
import HashProvider from '../utils/HashProvider';

export default class UserService extends CrudService<User> {
  private hashHandler: HashHandler;

  private USER_NOT_FOUND = {
    message: 'user not found',
    code: 404,
  };

  constructor(
    model = new UserModel(),
    hashHandler: HashHandler = new HashProvider()
  ) {
    super(model);
    this.hashHandler = hashHandler;
  }

  public async create(obj: User): Promise<Partial<User>> {
    const dbUser = await this.findeUserByEmail(obj.email);
    if (dbUser) throw new HttpException(409, 'E-mail already registered');
    const hashedUser = await this.hashPassword(obj);
    const user = await this.model.create(hashedUser);
    return { id: user._id, name: user.name, email: user.email };
  }

  public async read(): Promise<Array<Partial<User>>> {
    const users = await this.model.read();
    return this.removePassword(users);
  }

  public async readOne(id: string): Promise<Partial<User>> {
    const user = await this.model.readOne(id);
    if (!user) throw this.notFoundException();
    return { id: user._id, name: user.name, email: user.email };
  }

  public async update(id: string, obj: User): Promise<Partial<User>> {
    const hashedPassword = await this.hashPassword(obj);
    const user = await this.model.update(id, hashedPassword);
    if (!user) throw this.notFoundException();
    return { id: user._id, name: user.name, email: user.email };
  }

  public async delete(id: string): Promise<void> {
    const user = await this.model.delete(id);
    if (!user) throw this.notFoundException();
  }

  // eslint-disable-next-line class-methods-use-this
  private removePassword(users: Partial<User>[]): Array<Partial<User>> {
    const usersWithoutPassword = users.map(({ name, email, _id }) => ({
      name,
      email,
      id: _id,
    }));
    return usersWithoutPassword;
  }

  private async hashPassword(user: User): Promise<User> {
    const hashedPassword = await this.hashHandler.hashPayload(user.password);
    return { name: user.name, email: user.email, password: hashedPassword };
  }

  private async findeUserByEmail(email: string): Promise<User | null> {
    return this.model.findByEmail(email);
  }

  private notFoundException(): HttpException {
    throw new HttpException(
      this.USER_NOT_FOUND.code,
      this.USER_NOT_FOUND.message
    );
  }
}
