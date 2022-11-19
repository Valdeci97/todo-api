"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class GlobalMiddleware {
  errorHandler = (err, _req, res, _next) => {
    return res.status(err.status).json({
      message: err.message
    });
  };
}
exports.default = GlobalMiddleware;