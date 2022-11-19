"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uuidSchema = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ID_NOT_AVAILABLE = '400/there is no id param';
const NOT_ID_PARAM = '400/id param must be hexadecimal string';
const ID_MIN_LENGTH = '400/id param must have 24 characters length';
const uuidSchema = _joi.default.string().hex().min(24).required().messages({
  'any.required': ID_NOT_AVAILABLE,
  'string.hex': NOT_ID_PARAM,
  'string.min': ID_MIN_LENGTH
});
exports.uuidSchema = uuidSchema;