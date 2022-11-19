"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class MockTokenHandler {
  generate(token) {
    return `token:${token}`;
  }
  decode(token) {
    if (token === 'inválido') throw new Error();
    return {
      id: '6363daa6ab1e71a12204e9e4',
      iat: 1,
      exp: 1
    };
  }
}
exports.default = MockTokenHandler;