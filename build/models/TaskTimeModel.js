"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = require("mongoose");
var _dateFns = require("date-fns");
var _RelationTimeDatabaseModel = _interopRequireDefault(require("./RelationTimeDatabaseModel"));
var _TaskModel = require("./TaskModel");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class TaskTimeModel extends _RelationTimeDatabaseModel.default {
  constructor(model = (0, _mongoose.model)('Task', _TaskModel.taskSchema)) {
    super(model);
  }
  async findByDay(relationId) {
    const now = new Date();
    const tasks = await this.model.find({
      when: {
        $gte: (0, _dateFns.startOfDay)(now),
        $lte: (0, _dateFns.endOfDay)(now)
      },
      userId: {
        $in: relationId
      }
    }).sort('when');
    return tasks;
  }
  async findByWeek(relationId) {
    const now = new Date();
    const tasks = await this.model.find({
      when: {
        $gte: (0, _dateFns.startOfWeek)(now),
        $lte: (0, _dateFns.endOfWeek)(now)
      },
      userId: {
        $in: relationId
      }
    }).sort('when');
    return tasks;
  }
  async findByMonth(relationId) {
    const now = new Date();
    const tasks = await this.model.find({
      when: {
        $gte: (0, _dateFns.startOfMonth)(now),
        $lte: (0, _dateFns.endOfMonth)(now)
      },
      userId: {
        $in: relationId
      }
    }).sort('when');
    return tasks;
  }
  async findByYear(relationId) {
    const now = new Date();
    const tasks = await this.model.find({
      when: {
        $gte: (0, _dateFns.startOfYear)(now),
        $lte: (0, _dateFns.endOfYear)(now)
      },
      userId: {
        $in: relationId
      }
    }).sort('when');
    return tasks;
  }
  async findLate(relationId) {
    const now = new Date();
    const tasks = await this.model.find({
      when: {
        $lt: now
      },
      userId: {
        $in: relationId
      }
    }).sort('when');
    return tasks;
  }
}
exports.default = TaskTimeModel;