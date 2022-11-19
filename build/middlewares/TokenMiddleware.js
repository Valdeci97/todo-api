"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _HttpException = _interopRequireDefault(require("../exceptions/HttpException"));
var _jwt = _interopRequireDefault(require("../utils/jwt"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class TokenMiddleware {
  constructor(tokenHandler = new _jwt.default()) {
    this.tokenHandler = tokenHandler;
  }
  validate = (req, res, next) => {
    const {
      authorization
    } = req.headers;
    if (!authorization) {
      return res.status(404).json({
        message: 'token not found'
      });
    }
    const [, token] = authorization.split(' ');
    try {
      this.tokenHandler.decode(token);
      next();
    } catch (err) {
      next(new _HttpException.default(401, 'invalid token'));
    }
  };
}
exports.default = TokenMiddleware;