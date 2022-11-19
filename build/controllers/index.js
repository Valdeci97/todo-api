"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _HttpException = _interopRequireDefault(require("../exceptions/HttpException"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class Controller {
  statusCode = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    NOT_FOUND: 404
  };
  constructor(service) {
    this.service = service;
  }
  read = async (_req, res, next) => {
    try {
      const obj = await this.service.read();
      return res.status(this.statusCode.OK).json(obj);
    } catch (err) {
      next(new _HttpException.default());
    }
  };
}
exports.default = Controller;