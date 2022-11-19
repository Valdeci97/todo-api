"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _HttpException = _interopRequireDefault(require("../exceptions/HttpException"));
var _TaskTimeService = _interopRequireDefault(require("../services/TaskTimeService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class TaskTimeController {
  constructor(service = new _TaskTimeService.default(), route = '/tasks') {
    this.service = service;
    this.route = route;
  }
  getRoute() {
    return this.route;
  }
  todayTasks = async (req, res, next) => {
    const {
      id
    } = req.params;
    try {
      const tasks = await this.service.findByDay(id);
      return res.status(200).json(tasks);
    } catch (err) {
      next(new _HttpException.default());
    }
  };
  weekTasks = async (req, res, next) => {
    const {
      id
    } = req.params;
    try {
      const tasks = await this.service.findByWeek(id);
      return res.status(200).json(tasks);
    } catch (err) {
      next(new _HttpException.default());
    }
  };
  monthTasks = async (req, res, next) => {
    const {
      id
    } = req.params;
    try {
      const tasks = await this.service.findByDay(id);
      return res.status(200).json(tasks);
    } catch (err) {
      next(new _HttpException.default());
    }
  };
  yearTasks = async (req, res, next) => {
    const {
      id
    } = req.params;
    try {
      const tasks = await this.service.findByYear(id);
      return res.status(200).json(tasks);
    } catch (err) {
      next(new _HttpException.default());
    }
  };
  lateTasks = async (req, res, next) => {
    const {
      id
    } = req.params;
    try {
      const tasks = await this.service.findLate(id);
      return res.status(200).json(tasks);
    } catch (err) {
      next(new _HttpException.default());
    }
  };
}
exports.default = TaskTimeController;