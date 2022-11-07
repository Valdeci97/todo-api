import { Task } from '../interfaces/TaskInterface';
import TaskModel from '../models/TaskModel';
import RelationTimeService from './RelationTimeService';

export default class TaskTimeService extends RelationTimeService<Task> {
  constructor(model = new TaskModel()) {
    super(model);
  }

  public async findByDay(relationId: string): Promise<Task[]> {
    return this.model.findByDay(relationId);
  }

  public async findByWeek(relationId: string): Promise<Task[]> {
    return this.model.findByWeek(relationId);
  }

  public async findByMonth(relationId: string): Promise<Task[]> {
    return this.model.findByMonth(relationId);
  }

  public async findByYear(relationId: string): Promise<Task[]> {
    return this.model.findByYear(relationId);
  }

  public async findLate(relationId: string): Promise<Task[]> {
    return this.model.findLate(relationId);
  }
}
