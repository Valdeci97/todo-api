"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connectToDatabase;
require("dotenv/config");
var _mongoose = _interopRequireDefault(require("mongoose"));
var _logger = _interopRequireDefault(require("./logger"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MONGODB_URL = 'mongodb://root:docker@db/todo?authSource=admin';
const MONGODB_URI = process.env.MONGODB_URI || MONGODB_URL;
async function connectToDatabase() {
  try {
    _logger.default.info('Connecting to database');
    await _mongoose.default.connect(MONGODB_URI);
    _logger.default.info('Connected with success');
  } catch (err) {
    _logger.default.fatal(`Error connecting to database: ${err}`);
  }
}