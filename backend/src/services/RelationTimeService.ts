import { DateTimeModel } from '../interfaces/DateTimeModel';

export default abstract class RelationTimeService<T> {
  protected model: DateTimeModel<T>;

  constructor(model: DateTimeModel<T>) {
    this.model = model;
  }

  public abstract findByDay(_relationId: string): Promise<T[]>;

  public abstract findByWeek(_relationId: string): Promise<T[]>;

  public abstract findByMonth(_relationId: string): Promise<T[]>;

  public abstract findByYear(_relationId: string): Promise<T[]>;

  public abstract findLate(_relationId: string): Promise<T[]>;
}
