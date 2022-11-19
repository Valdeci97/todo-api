"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("dotenv/config");
var _bcryptjs = require("bcryptjs");
function hashSecret(secret, salts = 10) {
  return (0, _bcryptjs.hashSync)(secret, salts);
}
const secret = '8b716f7719f4c68ff62e11f820160e47';
const SECRET = process.env.JWT_SECRET || hashSecret(secret);
const authConfig = {
  secret: SECRET,
  expiresIn: '1d'
};
var _default = authConfig;
exports.default = _default;