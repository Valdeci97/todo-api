import { Model, model as createModel, Types } from 'mongoose';
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from 'date-fns';
import { Task } from '../../interfaces/TaskInterface';
import { taskSchema, TaskDocument } from '../../models/TaskModel';
import RelationTimeDatabaseModel from '../../models/RelationTimeDatabaseModel';

export default class MockTaskTimeModel extends RelationTimeDatabaseModel<Task> {
  private tasks: Task[] = [];

  constructor(model: Model<TaskDocument> = createModel('Task', taskSchema)) {
    super(model);
  }

  public async findByDay(relationId: string): Promise<Task[]> {
    const now = new Date();
    const tasks = this.tasks.filter(
      (task) =>
        task.when >= startOfDay(now) &&
        task.when <= endOfDay(now) &&
        task.userId === relationId
    );
    return tasks;
  }

  public async findByWeek(relationId: string): Promise<Task[]> {
    const now = new Date();
    const tasks = this.tasks.filter(
      (task) =>
        task.when >= startOfWeek(now) &&
        task.when <= endOfWeek(now) &&
        task.userId === relationId
    );
    return tasks;
  }

  public async findByMonth(relationId: string): Promise<Task[]> {
    const now = new Date();
    const tasks = this.tasks.filter(
      (task) =>
        task.when >= startOfMonth(now) &&
        task.when <= endOfMonth(now) &&
        task.userId === relationId
    );
    return tasks;
  }

  public async findByYear(relationId: string): Promise<Task[]> {
    const now = new Date();
    const tasks = this.tasks.filter(
      (task) =>
        task.when >= startOfYear(now) &&
        task.when <= endOfYear(now) &&
        task.userId === relationId
    );
    return tasks;
  }

  public async findLate(relationId: string): Promise<Task[]> {
    const now = new Date();
    const tasks = this.tasks.filter(
      (task) => task.when < now && task.userId === relationId
    );
    return tasks;
  }
}
