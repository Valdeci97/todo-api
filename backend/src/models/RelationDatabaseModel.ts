import { Document, Model } from 'mongoose';
import { DateTimeModel } from '../interfaces/DateTimeModel';
import { RelationModel } from '../interfaces/RelationModelInterface';

export default abstract class RelationDatabaseModel<T>
  implements RelationModel<T>, DateTimeModel<T>
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

  public abstract findByDate(
    _relationId: string,
    _when: Date
  ): Promise<T | null>;

  public abstract findByDay(_relationId: string): Promise<T[]>;

  public abstract findByWeek(_relationId: string): Promise<T[]>;

  public abstract findByMonth(_relationId: string): Promise<T[]>;

  public abstract findByYear(_relationId: string): Promise<T[]>;

  public abstract findLate(_relationId: string): Promise<T[]>;
}
