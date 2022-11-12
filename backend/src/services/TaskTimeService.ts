import { Task } from '../interfaces/TaskInterface';
import TaskTimeModel from '../models/TaskTimeModel';

import RelationTimeService from './RelationTimeService';

export default class TaskTimeService extends RelationTimeService<Task> {
  constructor(model = new TaskTimeModel()) {
    super(model);
  }
}
