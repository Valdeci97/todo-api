import { Document, model as createModel, Model, Schema } from 'mongoose';
import DatabaseModel from './DatabaseModel';
import { Task } from '../interfaces/TaskInterface';

export type TaskDocument = Task & Document;

const taskSchema = new Schema<TaskDocument>({
  userId: { type: String, required: true },
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  when: { type: Date, required: true },
  done: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
});

export default class TaskModel extends DatabaseModel<Task> {
  constructor(model: Model<TaskDocument> = createModel('Task', taskSchema)) {
    super(model);
  }

  public async update(id: string, obj: Task): Promise<Task | null> {
    return this.model.findOneAndUpdate({ _id: id }, obj);
  }
}
