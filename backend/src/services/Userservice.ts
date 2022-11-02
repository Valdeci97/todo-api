import { hash } from 'bcryptjs';
import Service from '.';
import HttpException from '../exceptions/HttpException';
import { User } from '../interfaces/UserInterface';
import logger from '../logger';
import UserModel from '../models/UserModel';

export default class UserService extends Service<User> {
  private hashSalts = 10;

  constructor(model = new UserModel()) {
    super(model);
  }

  public async create(obj: User): Promise<User> {
    const dbUser = await this.findeUserByEmail(obj.email);
    if (dbUser) throw new HttpException(400, 'Email already registered');
    const hashedUser = await this.hashPassword(obj);
    logger.info('Creating user');
    const user = await this.model.create(hashedUser);
    logger.info('User created successfully');
    user.password = '';
    return user;
  }

  public async read(): Promise<User[]> {
    const users = await this.model.read();
    return this.removePassword(users);
  }

  public async readOne(id: string): Promise<User> {
    const user = await this.model.readOne(id);
    if (!user) throw new HttpException(404, 'User not found');
    user.password = '';
    return user;
  }

  public async update(id: string, obj: User): Promise<User> {
    const hashedPassword = await this.hashPassword(obj);
    const user = await this.model.update(id, hashedPassword);
    if (!user) throw new HttpException(404, 'User not found');
    user.password = '';
    return user;
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

  private async hashPassword(user: User): Promise<User> {
    const hashedPassword = await hash(user.password, this.hashSalts);
    return { name: user.name, email: user.email, password: hashedPassword };
  }

  private async findeUserByEmail(email: string): Promise<User | null> {
    return this.model.findByEmail(email);
  }
}
