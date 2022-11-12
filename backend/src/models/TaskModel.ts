import { Document, model as createModel, Model, Schema } from 'mongoose';
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
import RelationDatabaseModel from './RelationDatabaseModel';

export type TaskDocument = Task & Document;

export const taskSchema = new Schema<TaskDocument>(
  {
    userId: { type: String, required: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    when: { type: Date, required: true },
    done: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

export default class TaskModel extends RelationDatabaseModel<Task> {
  constructor(model: Model<TaskDocument> = createModel('Task', taskSchema)) {
    super(model);
  }

  public async read(relationId: string): Promise<Task[]> {
    return this.model.find({ userId: relationId });
  }

  public async update(id: string, obj: Task): Promise<Task | null> {
    return this.model.findOneAndUpdate({ _id: id }, obj, { new: true });
  }

  public async findByDate(
    relationId: string,
    when: Date | string
  ): Promise<Task | null> {
    return this.model.findOne({
      when: { $eq: when },
      userId: { $in: relationId },
    });
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
