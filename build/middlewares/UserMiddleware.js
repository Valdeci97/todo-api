"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _userSchema = require("../utils/joiSchemas/userSchema");
class UserMiddleware {
  validateName = (req, res, next) => {
    const {
      error
    } = _userSchema.username.validate(req.body);
    if (error) {
      const [code, message] = error.message.split('/');
      return res.status(Number(code)).json({
        message
      });
    }
    next();
  };
  validateEmail = (req, res, next) => {
    const {
      error
    } = _userSchema.email.validate(req.body);
    if (error) {
      const [code, message] = error.message.split('/');
      return res.status(Number(code)).json({
        message
      });
    }
    next();
  };
  validatePassword = (req, res, next) => {
    const {
      error
    } = _userSchema.password.validate(req.body);
    if (error) {
      const [code, message] = error.message.split('/');
      return res.status(Number(code)).json({
        message
      });
    }
    next();
  };
}
exports.default = UserMiddleware;