import { Document, Model, Types, model as createModel } from 'mongoose';
import { User } from '../../interfaces/UserInterface';
import DatabaseModel from '../../models/DatabaseModel';
import { userSchema } from '../../models/UserModel';

export default class MockUserModel extends DatabaseModel<User> {
  private users: User[] = [];

  constructor(model: Model<User & Document> = createModel('User', userSchema)) {
    super(model);
  }

  public async create(obj: User): Promise<User> {
    obj._id = new Types.ObjectId().toString();
    this.users.push(obj);
    return obj;
  }

  public async read(): Promise<User[]> {
    return this.users;
  }

  public async readOne(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);
    if (!user) return null;
    return user;
  }

  public async update(id: string, obj: User): Promise<User | null> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) return null;
    this.users[userIndex].name = obj.name;
    return obj;
  }

  public async delete(id: string): Promise<boolean> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) return false;
    this.users.splice(userIndex, 1);
    return true;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);
    if (!user) return null;
    return user;
  }
}
