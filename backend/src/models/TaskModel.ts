import { Document, model as createModel, Model, Schema } from 'mongoose';
import { Task } from '../interfaces/TaskInterface';
import RelationDatabaseModel from './RelationDatabaseModel';

export type TaskDocument = Task & Document;

const taskSchema = new Schema<TaskDocument>(
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
}
