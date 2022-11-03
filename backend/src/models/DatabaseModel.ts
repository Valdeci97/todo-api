import { Model as M, Document } from 'mongoose';
import { CrudModel } from '../interfaces/CrudModelInterface';

export default abstract class DatabaseModel<T> implements CrudModel<T> {
  protected model: M<T & Document>;

  constructor(model: M<T & Document>) {
    this.model = model;
  }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async read(): Promise<T[]> {
    return this.model.find();
  }

  public async readOne(id: string): Promise<T | null> {
    const obj = await this.model.findOne({ _id: id });
    if (!obj) return null;
    return obj;
  }

  public abstract update(_id: string, _obj: T): Promise<T | null>;

  public async delete(id: string): Promise<boolean> {
    const obj = await this.model.deleteOne({ _id: id });
    return obj.deletedCount > 0;
  }

  public async findByEmail(email: string): Promise<T | null> {
    return this.model.findOne({ email });
  }
}
