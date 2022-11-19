"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.when = exports.userId = exports.title = exports.done = exports.description = exports.category = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const UNFILLED_PROPERTY = '400/{{#label}} property must be filled';
const ID_NOT_HEXA = '400/{{#label}} property must be hexadecimal string';
const ID_MIN_LENGTH = '400/id param must have 24 characters length';
const INVALID_CATEGORY = `
400/{{#label}} property must be in "Estudos, Esportes, Compras, Lazer, Exercícios, Alimentação ou Viagem" values`;
const STRING_BASE = '400/{{#label}} property must be a string';
const DATE_BASE = '400/{{#label}} property must be a date';
const DATE_FORMAT = `400/{{#label}} property must follow ISO 8601 pattern i.e yyyy-MM-ddTHH:mm:ss.ms`;
const BOOLEAN_BASE = '400/{{#label}} property must be a bollean value';
const userId = _joi.default.object({
  userId: _joi.default.string().hex().min(24).required().messages({
    'any.required': UNFILLED_PROPERTY,
    'string.hex': ID_NOT_HEXA,
    'string.min': ID_MIN_LENGTH
  })
}).unknown(true);
exports.userId = userId;
const category = _joi.default.object({
  category: _joi.default.string().valid('Estudos', 'Esportes', 'Compras', 'Lazer', 'Exercícios', 'Alimentação', 'Viagem').required().messages({
    'any.only': INVALID_CATEGORY,
    'any.required': UNFILLED_PROPERTY,
    'string.empty': UNFILLED_PROPERTY,
    'string.base': STRING_BASE
  })
}).unknown(true);
exports.category = category;
const title = _joi.default.object({
  title: _joi.default.string().required().messages({
    'any.required': UNFILLED_PROPERTY,
    'string.empty': UNFILLED_PROPERTY,
    'string.base': STRING_BASE
  })
}).unknown(true);
exports.title = title;
const description = _joi.default.object({
  description: _joi.default.string().required().messages({
    'any.required': UNFILLED_PROPERTY,
    'string.empty': UNFILLED_PROPERTY,
    'string.base': STRING_BASE
  })
}).unknown(true);
exports.description = description;
const when = _joi.default.object({
  when: _joi.default.date().iso().required().messages({
    'date.base': DATE_BASE,
    'date.strict': DATE_BASE,
    'date.format': DATE_FORMAT,
    'any.required': UNFILLED_PROPERTY
  })
}).unknown(true);
exports.when = when;
const done = _joi.default.object({
  done: _joi.default.boolean().required().messages({
    'boolean.base': BOOLEAN_BASE
  })
}).unknown(true);
exports.done = done;