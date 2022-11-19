"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ = _interopRequireDefault(require("."));
var _HttpException = _interopRequireDefault(require("../exceptions/HttpException"));
var _logger = _interopRequireDefault(require("../logger"));
var _Userservice = _interopRequireDefault(require("../services/Userservice"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UserController extends _.default {
  constructor(service = new _Userservice.default(), route = '/users') {
    super(service);
    this.route = route;
  }
  getRoute() {
    return this.route;
  }
  create = async (req, res, next) => {
    try {
      const user = await this.service.create(req.body);
      return res.status(this.statusCode.CREATED).json({
        user
      });
    } catch (err) {
      if (err instanceof _HttpException.default) {
        return next(err);
      }
      _logger.default.fatal(err);
      next(new _HttpException.default());
    }
  };
  readOne = async (req, res, next) => {
    const {
      id
    } = req.params;
    try {
      const user = await this.service.readOne(id);
      return res.status(this.statusCode.OK).json({
        user
      });
    } catch (err) {
      if (err instanceof _HttpException.default) {
        return next(err);
      }
      _logger.default.fatal(err);
      next(new _HttpException.default());
    }
  };
  update = async (req, res, next) => {
    const {
      id
    } = req.params;
    try {
      const user = await this.service.update(id, req.body);
      return res.status(this.statusCode.OK).json({
        user
      });
    } catch (err) {
      if (err instanceof _HttpException.default) {
        return next(err);
      }
      _logger.default.fatal(err);
      next(new _HttpException.default());
    }
  };
  delete = async (req, res, next) => {
    const {
      id
    } = req.params;
    try {
      await this.service.delete(id);
      return res.status(this.statusCode.NO_CONTENT).end();
    } catch (err) {
      if (err instanceof _HttpException.default) {
        return next(err);
      }
      _logger.default.fatal(err);
      next(new _HttpException.default());
    }
  };
}
exports.default = UserController;