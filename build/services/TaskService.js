"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _RelationService = _interopRequireDefault(require("./RelationService"));
var _TaskModel = _interopRequireDefault(require("../models/TaskModel"));
var _HttpException = _interopRequireDefault(require("../exceptions/HttpException"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class TaskService extends _RelationService.default {
  TASK = {
    NOT_FOUND: {
      message: 'task not found',
      code: 404
    },
    DATE: {
      message: 'there is another task booked at same date',
      code: 409
    }
  };
  constructor(model = new _TaskModel.default()) {
    super(model);
  }
  async create(obj) {
    const dbTask = await this.verifyTaskDate(obj.userId, obj.when);
    if (dbTask) {
      throw new _HttpException.default(this.TASK.DATE.code, this.TASK.DATE.message);
    }
    const task = await this.model.create(obj);
    return this.setTaskId(task);
  }
  async read(relationId) {
    const tasks = await this.model.read(relationId);
    return this.setTasksId(tasks);
  }
  async readOne(id) {
    const task = await this.model.readOne(id);
    if (!task) throw this.notFoundException();
    return this.setTaskId(task);
  }
  async update(id, obj) {
    const task = await this.model.update(id, obj);
    if (!task) throw this.notFoundException();
    return this.setTaskId(task);
  }
  async delete(id) {
    const task = await this.model.delete(id);
    if (!task) throw this.notFoundException();
  }
  notFoundException() {
    throw new _HttpException.default(this.TASK.NOT_FOUND.code, this.TASK.NOT_FOUND.message);
  }
  async verifyTaskDate(relationId, when) {
    return this.model.findByDate(relationId, when);
  }

  // eslint-disable-next-line class-methods-use-this
  setTaskId(task) {
    return {
      id: task._id,
      userId: task.userId,
      category: task.category,
      title: task.title,
      description: task.description,
      when: task.when,
      done: task.done,
      createdAt: task.createdAt
    };
  }
  setTasksId(tasks) {
    const tasksWithId = tasks.map(task => this.setTaskId(task));
    return tasksWithId;
  }
}
exports.default = TaskService;