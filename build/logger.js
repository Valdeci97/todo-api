"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _pino = _interopRequireDefault(require("pino"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = (0, _pino.default)({
  enabled: true,
  level: 'info'
});
exports.default = _default;