"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.username = exports.password = exports.email = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function greaterThanMessageGenerator(label, length) {
  return `400/${label} must be greater than or equal ${length} characters length`;
}
const UNFILLED_PROPERTY = '400/{{#label}} property must be filled';
const MIN_NAME_LENGTH = greaterThanMessageGenerator('name', '3');
const STRING_BASE = '400/{{#label}} property must be a string';
const INVALID_EMAIL = '400/{{#label}} must be a valid e-mail. i.e user@gmail.com';
const MIN_PASSWORD_LENGTH = greaterThanMessageGenerator('password', '8');
const username = _joi.default.object({
  name: _joi.default.string().min(3).required().messages({
    'any.required': UNFILLED_PROPERTY,
    'string.empty': UNFILLED_PROPERTY,
    'string.min': MIN_NAME_LENGTH,
    'string.base': STRING_BASE
  })
}).unknown(true);
exports.username = username;
const email = _joi.default.object({
  email: _joi.default.string().email().required().messages({
    'any.required': UNFILLED_PROPERTY,
    'string.email': INVALID_EMAIL,
    'string.base': STRING_BASE
  })
}).unknown(true);
exports.email = email;
const password = _joi.default.object({
  password: _joi.default.string().min(8).required().messages({
    'any.required': UNFILLED_PROPERTY,
    'string.empty': UNFILLED_PROPERTY,
    'string.min': MIN_PASSWORD_LENGTH,
    'string.base': STRING_BASE
  })
}).unknown(true);
exports.password = password;