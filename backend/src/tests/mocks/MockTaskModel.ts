import { Model, model as createModel, Types } from 'mongoose';
import RelationDatabaseModel from '../../models/RelationDatabaseModel';
import { Task } from '../../interfaces/TaskInterface';
import { taskSchema, TaskDocument } from '../../models/TaskModel';

export default class MockTaskModel extends RelationDatabaseModel<Task> {
  private tasks: Task[] = [];

  constructor(model: Model<TaskDocument> = createModel('Task', taskSchema)) {
    super(model);
  }

  public async create(obj: Task): Promise<Task> {
    obj._id = new Types.ObjectId().toString();
    this.tasks.push(obj);
    return obj;
  }

  public async read(relationId: string): Promise<Task[]> {
    const tasks = this.tasks.filter((task) => task.userId === relationId);
    return tasks;
  }

  public async readOne(id: string): Promise<Task | null> {
    const task = this.tasks.find((task) => task._id === id);
    if (!task) return null;
    return task;
  }

  public async update(id: string, obj: Task): Promise<Task | null> {
    const taskIndex = this.tasks.findIndex((task) => task._id === id);
    if (taskIndex === -1) return null;
    this.tasks[taskIndex] = obj;
    return obj;
  }

  public async delete(id: string): Promise<boolean> {
    const taskIndex = this.tasks.findIndex((task) => task._id === id);
    if (taskIndex === -1) return false;
    this.tasks.splice(taskIndex, 1);
    return true;
  }

  public async findByDate(
    relationId: string,
    when: Date | string
  ): Promise<Task | null> {
    const task = this.tasks.find(
      (task) => task.userId === relationId && task.when === when
    );
    if (!task) return null;
    return task;
  }
}
