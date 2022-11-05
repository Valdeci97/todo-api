import { Document, Model } from 'mongoose';
import { RelationModel } from '../interfaces/RelationModelInterface';

export default abstract class RelationDatabaseModel<T>
  implements RelationModel<T>
{
  protected model: Model<T & Document>;

  constructor(model: Model<T & Document>) {
    this.model = model;
  }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public abstract read(_relationId: string): Promise<T[]>;

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
}
