"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _uuid = require("../utils/joiSchemas/uuid");
class GuidMiddleware {
  validateGuid = (req, res, next) => {
    const {
      error
    } = _uuid.uuidSchema.validate(req.params.id);
    if (error) {
      console.log(error);
      const [code, message] = error.message.split('/');
      return res.status(Number(code)).json({
        message
      });
    }
    next();
  };
}
exports.default = GuidMiddleware;