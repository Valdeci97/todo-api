import { model as createModel, Model } from 'mongoose';
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
import { Task } from '../interfaces/TaskInterface';
import RelationTimeDatabaseModel from './RelationTimeDatabaseModel';
import { TaskDocument, taskSchema } from './TaskModel';

export default class TaskTimeModel extends RelationTimeDatabaseModel<Task> {
  constructor(model: Model<TaskDocument> = createModel('Task', taskSchema)) {
    super(model);
  }

  public async findByDay(relationId: string): Promise<Task[]> {
    const now = new Date();
    const tasks = await this.model
      .find({
        when: { $gte: startOfDay(now), $lte: endOfDay(now) },
        userId: { $in: relationId },
      })
      .sort('when');
    return tasks;
  }

  public async findByWeek(relationId: string): Promise<Task[]> {
    const now = new Date();
    const tasks = await this.model
      .find({
        when: { $gte: startOfWeek(now), $lte: endOfWeek(now) },
        userId: { $in: relationId },
      })
      .sort('when');
    return tasks;
  }

  public async findByMonth(relationId: string): Promise<Task[]> {
    const now = new Date();
    const tasks = await this.model
      .find({
        when: { $gte: startOfMonth(now), $lte: endOfMonth(now) },
        userId: { $in: relationId },
      })
      .sort('when');
    return tasks;
  }

  public async findByYear(relationId: string): Promise<Task[]> {
    const now = new Date();
    const tasks = await this.model
      .find({
        when: { $gte: startOfYear(now), $lte: endOfYear(now) },
        userId: { $in: relationId },
      })
      .sort('when');
    return tasks;
  }

  public async findLate(relationId: string): Promise<Task[]> {
    const now = new Date();
    const tasks = await this.model
      .find({
        when: { $lt: now },
        userId: { $in: relationId },
      })
      .sort('when');
    return tasks;
  }
}
