import { Document, Model } from 'mongoose';
import { DateTimeModel } from '../interfaces/DateTimeModel';

export default abstract class RelationTimeDatabaseModel<T>
  implements DateTimeModel<T>
{
  protected model: Model<T & Document>;

  constructor(model: Model<T & Document>) {
    this.model = model;
  }

  public abstract findByDay(_relationId: string): Promise<T[]>;

  public abstract findByWeek(_relationId: string): Promise<T[]>;

  public abstract findByMonth(_relationId: string): Promise<T[]>;

  public abstract findByYear(_relationId: string): Promise<T[]>;

  public abstract findLate(_relationId: string): Promise<T[]>;
}
