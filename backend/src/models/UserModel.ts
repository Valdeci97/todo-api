import { Document, model as createModel, Model, Schema } from 'mongoose';
import { User } from '../interfaces/UserInterface';
import DatabaseModel from './DatabaseModel';

export type UserDocument = User & Document;

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { versionKey: false }
);

export default class UserModel extends DatabaseModel<User> {
  constructor(model: Model<UserDocument> = createModel('User', userSchema)) {
    super(model);
  }

  public async update(id: string, obj: User): Promise<User | null> {
    return this.model.findOneAndUpdate(
      { _id: id },
      { name: obj.name },
      { new: true }
    );
  }
}
