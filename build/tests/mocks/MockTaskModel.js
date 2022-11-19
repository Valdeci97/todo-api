"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = require("mongoose");
var _RelationDatabaseModel = _interopRequireDefault(require("../../models/RelationDatabaseModel"));
var _TaskModel = require("../../models/TaskModel");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class MockTaskModel extends _RelationDatabaseModel.default {
  tasks = [];
  constructor(model = (0, _mongoose.model)('Task', _TaskModel.taskSchema)) {
    super(model);
  }
  async create(obj) {
    obj._id = new _mongoose.Types.ObjectId().toString();
    this.tasks.push(obj);
    return obj;
  }
  async read(relationId) {
    const tasks = this.tasks.filter(task => task.userId === relationId);
    return tasks;
  }
  async readOne(id) {
    const task = this.tasks.find(task => task._id === id);
    if (!task) return null;
    return task;
  }
  async update(id, obj) {
    const taskIndex = this.tasks.findIndex(task => task._id === id);
    if (taskIndex === -1) return null;
    this.tasks[taskIndex] = obj;
    return obj;
  }
  async delete(id) {
    const taskIndex = this.tasks.findIndex(task => task._id === id);
    if (taskIndex === -1) return false;
    this.tasks.splice(taskIndex, 1);
    return true;
  }
  async findByDate(relationId, when) {
    const task = this.tasks.find(task => task.userId === relationId && task.when === when);
    if (!task) return null;
    return task;
  }
}
exports.default = MockTaskModel;