"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _bcryptjs = require("bcryptjs");
class HashProvider {
  hashSalts = 10;
  async hashPayload(payload) {
    return (0, _bcryptjs.hash)(payload, this.hashSalts);
  }

  // eslint-disable-next-line class-methods-use-this
  async compareHash(payload, hashString) {
    return (0, _bcryptjs.compare)(payload, hashString);
  }
}
exports.default = HashProvider;