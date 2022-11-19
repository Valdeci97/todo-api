"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _expressRateLimit = require("express-rate-limit");
class RateLimiter {
  static ONE_SECOND_IN_MS = 1000;
  static MAX_REQUESTS = 20;
  static MESSAGE = {
    message: `you have exceeded the limit of ${this.MAX_REQUESTS} requests per second`
  };
  static createRateLimiter() {
    return (0, _expressRateLimit.rateLimit)({
      windowMs: this.ONE_SECOND_IN_MS,
      max: this.MAX_REQUESTS,
      message: this.MESSAGE,
      standardHeaders: true,
      legacyHeaders: false
    });
  }
}
exports.default = RateLimiter;