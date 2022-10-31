import { Model as M, Document } from 'mongoose';
import { Model } from '../interfaces/ModelInterface';

export default abstract class DatabaseModel<T> implements Model<T> {
  protected model: M<T & Document>;

  constructor(model: M<T & Document>) {
    this.model = model;
  }

  public async create(obj: T): Promise<T> {
    try {
      const newObj = await this.model.create({ ...obj });
      return newObj;
    } catch (err) {
      throw new Error();
    }
  }

  public async read(): Promise<Partial<T>[]> {
    try {
      const objs = await this.model.find();
      return objs;
    } catch (err) {
      throw new Error();
    }
  }

  public async readOne(id: string): Promise<Partial<T>> {
    try {
      const obj = await this.model.findOne({ _id: id });
      if (!obj) throw new Error();
      return obj;
    } catch (err) {
      throw new Error();
    }
  }

  public abstract update(_id: string, _obj: T): Promise<Partial<T>>;

  public async delete(id: string): Promise<void> {
    try {
      const dbObj = await this.model.findOne({ _id: id });
      if (!dbObj) throw new Error();
      await this.model.deleteOne({ _id: id });
    } catch (err) {
      throw new Error();
    }
  }
}
