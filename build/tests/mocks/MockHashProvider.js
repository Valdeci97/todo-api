"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class MockHashProvider {
  async hashPayload(payload) {
    return payload;
  }
  async compareHash(payload, hashString) {
    return payload === hashString;
  }
}
exports.default = MockHashProvider;