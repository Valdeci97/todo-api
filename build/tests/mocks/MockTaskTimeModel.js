"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = require("mongoose");
var _dateFns = require("date-fns");
var _TaskModel = require("../../models/TaskModel");
var _RelationTimeDatabaseModel = _interopRequireDefault(require("../../models/RelationTimeDatabaseModel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class MockTaskTimeModel extends _RelationTimeDatabaseModel.default {
  tasks = [];
  constructor(model = (0, _mongoose.model)('Task', _TaskModel.taskSchema)) {
    super(model);
  }
  async findByDay(relationId) {
    const now = new Date();
    const tasks = this.tasks.filter(task => task.when >= (0, _dateFns.startOfDay)(now) && task.when <= (0, _dateFns.endOfDay)(now) && task.userId === relationId);
    return tasks;
  }
  async findByWeek(relationId) {
    const now = new Date();
    const tasks = this.tasks.filter(task => task.when >= (0, _dateFns.startOfWeek)(now) && task.when <= (0, _dateFns.endOfWeek)(now) && task.userId === relationId);
    return tasks;
  }
  async findByMonth(relationId) {
    const now = new Date();
    const tasks = this.tasks.filter(task => task.when >= (0, _dateFns.startOfMonth)(now) && task.when <= (0, _dateFns.endOfMonth)(now) && task.userId === relationId);
    return tasks;
  }
  async findByYear(relationId) {
    const now = new Date();
    const tasks = this.tasks.filter(task => task.when >= (0, _dateFns.startOfYear)(now) && task.when <= (0, _dateFns.endOfYear)(now) && task.userId === relationId);
    return tasks;
  }
  async findLate(relationId) {
    const now = new Date();
    const tasks = this.tasks.filter(task => task.when < now && task.userId === relationId);
    return tasks;
  }
}
exports.default = MockTaskTimeModel;