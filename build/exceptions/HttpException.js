"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class HttpException extends Error {
  constructor(status = 500, message = 'Internal server error') {
    super(message);
    this.status = status;
    this.message = message;
  }
}
exports.default = HttpException;