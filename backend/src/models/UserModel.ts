import { Document, model as createModel, Model, Schema } from 'mongoose';
import { User } from '../interfaces/UserInterface';
import DatabaseModel from './DatabaseModel';

export interface UserDocument extends User, Document {}

const userSchema = new Schema<UserDocument>({
  name: String,
  email: String,
  password: String,
});

export default class UserModel extends DatabaseModel<User> {
  constructor(model: Model<UserDocument> = createModel('User', userSchema)) {
    super(model);
  }

  public async update(id: string, obj: User): Promise<User | null> {
    return this.model.findOneAndUpdate({ _id: id }, obj);
  }
}