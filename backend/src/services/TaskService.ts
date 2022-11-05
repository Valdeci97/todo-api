import RelationService from './RelationService';
import { Task } from '../interfaces/TaskInterface';
import TaskModel from '../models/TaskModel';
import HttpException from '../exceptions/HttpException';

export default class TaskService extends RelationService<Task> {
  private TASK_NOT_FOUND = {
    message: 'task not found',
    code: 404,
  };

  constructor(model = new TaskModel()) {
    super(model);
  }

  public async create(obj: Task): Promise<Task> {
    const task = await this.model.create(obj);
    return task;
  }

  public async read(relationId: string): Promise<Task[]> {
    const tasks = await this.model.read(relationId);
    return tasks;
  }

  public async readOne(id: string): Promise<Task> {
    const task = await this.model.readOne(id);
    if (!task) throw this.notFoundException();
    return task;
  }

  public async update(id: string, obj: Task): Promise<Task> {
    const task = await this.model.update(id, obj);
    if (!task) throw this.notFoundException();
    return task;
  }

  public async delete(id: string): Promise<void> {
    const task = await this.model.delete(id);
    if (!task) throw this.notFoundException();
  }

  private notFoundException(): HttpException {
    throw new HttpException(
      this.TASK_NOT_FOUND.code,
      this.TASK_NOT_FOUND.message
    );
  }
}
