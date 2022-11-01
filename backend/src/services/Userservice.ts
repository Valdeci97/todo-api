import Service from '.';
import HttpException from '../exceptions/HttpException';
import { User } from '../interfaces/UserInterface';
import logger from '../logger';
import UserModel from '../models/UserModel';

export default class UserService extends Service<User> {
  constructor(model = new UserModel()) {
    super(model);
  }

  public async create(obj: User): Promise<Partial<User>> {
    try {
      logger.info('Creating user');
      const user = await this.model.create(obj);
      logger.info('User created successfully');
      return { name: user.name, email: user.email };
    } catch (err) {
      logger.fatal('Can not create user');
      throw new HttpException(500, 'Failed to create user');
    }
  }

  public async read(): Promise<Partial<User>[]> {
    const users = await this.model.read();
    return this.removePassword(users);
  }

  public async readOne(id: string): Promise<Partial<User>> {
    try {
      const user = await this.model.readOne(id);
      if (!user) throw new HttpException(404, 'User not found');
      return { name: user.name, email: user.email };
    } catch (err) {
      throw new HttpException();
    }
  }

  public async update(id: string, obj: User): Promise<Partial<User>> {
    try {
      const user = await this.model.update(id, obj);
      if (!user) throw new HttpException(404, 'User not found');
      return { name: user.name, email: user.email };
    } catch (err) {
      throw new HttpException();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private removePassword(users: User[]): Array<Partial<User>> {
    const usersWithoutPassword = users.map(({ name, email }) => ({
      name,
      email,
    }));
    return usersWithoutPassword;
  }
}
