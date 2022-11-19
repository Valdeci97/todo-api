"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _HttpException = _interopRequireDefault(require("../exceptions/HttpException"));
var _LoginService = _interopRequireDefault(require("../services/LoginService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class LoginController {
  constructor(service = new _LoginService.default(), route = '/login') {
    this.service = service;
    this.route = route;
  }
  getRoute() {
    return this.route;
  }
  login = async (req, res, next) => {
    try {
      const result = await this.service.login(req.body);
      return res.status(200).json({
        login: result
      });
    } catch (err) {
      if (err instanceof _HttpException.default) {
        return next(err);
      }
      next(new _HttpException.default());
    }
  };
}
exports.default = LoginController;