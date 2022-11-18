import { DateTimeModel } from '../interfaces/DateTimeModel';

export default abstract class RelationTimeService<T> {
  protected model: DateTimeModel<T>;

  constructor(model: DateTimeModel<T>) {
    this.model = model;
  }

  public findByDay(relationId: string): Promise<T[]> {
    return this.model.findByDay(relationId);
  }

  public findByWeek(relationId: string): Promise<T[]> {
    return this.model.findByWeek(relationId);
  }

  public async findByMonth(relationId: string): Promise<T[]> {
    return this.model.findByMonth(relationId);
  }

  public async findByYear(relationId: string): Promise<T[]> {
    return this.model.findByYear(relationId);
  }

  public async findLate(relationId: string): Promise<T[]> {
    return this.model.findLate(relationId);
  }
}
