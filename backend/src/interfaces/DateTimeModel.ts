export interface DateTimeModel<T> {
  findByDay(relationId: string): Promise<T[]>;
  findByWeek(relationId: string): Promise<T[]>;
  findByMonth(relationId: string): Promise<T[]>;
  findByYear(relationId: string): Promise<T[]>;
  findLate(relationId: string): Promise<T[]>;
}
