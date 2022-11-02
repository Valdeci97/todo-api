import Service from '.';
import HttpException from '../exceptions/HttpException';
import { User } from '../interfaces/UserInterface';
import logger from '../logger';
import UserModel from '../models/UserModel';

export default class UserService extends Service<User> {
  constructor(model = new UserModel()) {
    super(model);
  }

  public async create(obj: User): Promise<User> {
    try {
      logger.info('Creating user');
      const user = await this.model.create(obj);
      logger.info('User created successfully');
      user.password = '';
      return user;
    } catch (err) {
      logger.fatal('Can not create user');
      throw new HttpException(500, 'Failed to create user');
    }
  }

  public async read(): Promise<User[]> {
    const users = await this.model.read();
    return this.removePassword(users);
  }

  public async readOne(id: string): Promise<User> {
    try {
      const user = await this.model.readOne(id);
      if (!user) throw new HttpException(404, 'User not found');
      user.password = '';
      return user;
    } catch (err) {
      throw new HttpException();
    }
  }

  public async update(id: string, obj: User): Promise<User> {
    try {
      const user = await this.model.update(id, obj);
      if (!user) throw new HttpException(404, 'User not found');
      user.password = '';
      return user;
    } catch (err) {
      throw new HttpException();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private removePassword(users: User[]): User[] {
    const usersWithoutPassword = users.map((user) => {
      // eslint-disable-next-line no-param-reassign
      user.password = '';
      return user;
    });
    return usersWithoutPassword;
  }
}
