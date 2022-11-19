"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("dotenv/config");
var _jsonwebtoken = require("jsonwebtoken");
var _authConfig = _interopRequireDefault(require("./authConfig"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable class-methods-use-this */

class jsonWebToken {
  generate(obj) {
    return (0, _jsonwebtoken.sign)(obj, _authConfig.default.secret, {
      algorithm: 'HS512',
      expiresIn: _authConfig.default.expiresIn
    });
  }
  decode(token) {
    return (0, _jsonwebtoken.verify)(token, _authConfig.default.secret);
  }
}
exports.default = jsonWebToken;