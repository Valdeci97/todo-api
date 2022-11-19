"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _taskSchema = require("../utils/joiSchemas/taskSchema");
class TaskMiddleware {
  validateUserId = (req, res, next) => {
    const {
      error
    } = _taskSchema.userId.validate(req.body);
    if (error) {
      const [code, message] = error.message.split('/');
      return res.status(Number(code)).json({
        message
      });
    }
    next();
  };
  validateCategory = (req, res, next) => {
    const {
      error
    } = _taskSchema.category.validate(req.body);
    if (error) {
      const [code, message] = error.message.split('/');
      return res.status(Number(code)).json({
        message
      });
    }
    next();
  };
  validateTitle = (req, res, next) => {
    const {
      error
    } = _taskSchema.title.validate(req.body);
    if (error) {
      const [code, message] = error.message.split('/');
      return res.status(Number(code)).json({
        message
      });
    }
    next();
  };
  validateDescription = (req, res, next) => {
    const {
      error
    } = _taskSchema.description.validate(req.body);
    if (error) {
      const [code, message] = error.message.split('/');
      return res.status(Number(code)).json({
        message
      });
    }
    next();
  };
  validateWhen = (req, res, next) => {
    const {
      error
    } = _taskSchema.when.validate(req.body);
    if (error) {
      const [code, message] = error.message.split('/');
      return res.status(Number(code)).json({
        message
      });
    }
    next();
  };
  validateDone = (req, res, next) => {
    const {
      error
    } = _taskSchema.done.validate(req.body, {
      convert: false
    });
    if (error) {
      const [code, message] = error.message.split('/');
      return res.status(Number(code)).json({
        message
      });
    }
    next();
  };
}
exports.default = TaskMiddleware;