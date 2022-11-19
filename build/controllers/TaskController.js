"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _HttpException = _interopRequireDefault(require("../exceptions/HttpException"));
var _TaskService = _interopRequireDefault(require("../services/TaskService"));
var _jwt = _interopRequireDefault(require("../utils/jwt"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class TaskController {
  constructor(service = new _TaskService.default(), tokenHandler = new _jwt.default(), route = '/tasks') {
    this.service = service;
    this.tokenHandler = tokenHandler;
    this.route = route;
  }
  getRoute() {
    return this.route;
  }
  create = async (req, res, next) => {
    try {
      const task = await this.service.create(req.body);
      return res.status(201).json({
        task
      });
    } catch (err) {
      if (err instanceof _HttpException.default) {
        return next(err);
      }
      next(new _HttpException.default());
    }
  };
  read = async (req, res, next) => {
    const {
      authorization
    } = req.headers;
    if (!authorization) return next(new _HttpException.default(404, 'token not found'));
    try {
      const [, auth] = authorization.split(' ');
      const token = this.tokenHandler.decode(auth);
      const tasks = await this.service.read(token.id);
      return res.status(200).json(tasks);
    } catch (err) {
      next(new _HttpException.default());
    }
  };
  readOne = async (req, res, next) => {
    const {
      id
    } = req.params;
    try {
      const task = await this.service.readOne(id);
      return res.status(200).json({
        task
      });
    } catch (err) {
      if (err instanceof _HttpException.default) {
        return next(err);
      }
      next(new _HttpException.default());
    }
  };
  update = async (req, res, next) => {
    const {
      id
    } = req.params;
    try {
      const task = await this.service.update(id, req.body);
      return res.status(200).json({
        task
      });
    } catch (err) {
      if (err instanceof _HttpException.default) {
        return next(err);
      }
      next(new _HttpException.default());
    }
  };
  delete = async (req, res, next) => {
    const {
      id
    } = req.params;
    try {
      await this.service.delete(id);
      return res.status(204).end();
    } catch (err) {
      if (err instanceof _HttpException.default) {
        return next(err);
      }
      next(new _HttpException.default());
    }
  };
}
exports.default = TaskController;