"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
class CustomRouter {
  constructor() {
    this.router = (0, _express.Router)();
  }
  addGetRoute(route, reqFunc, ...middlewares) {
    this.router.get(route, ...middlewares, reqFunc);
  }
  addPostRoute(route, reqFunc, ...middlewares) {
    this.router.post(route, ...middlewares, reqFunc);
  }
  addPutRoute(route, reqFunc, ...middlewares) {
    this.router.put(route, ...middlewares, reqFunc);
  }
  addPatchRoute(route, reqFunc, ...middlewares) {
    this.router.patch(route, ...middlewares, reqFunc);
  }
  addDeleteRoute(route, reqFunc, ...middlewares) {
    this.router.delete(route, ...middlewares, reqFunc);
  }
  getRouter() {
    return this.router;
  }
}
exports.default = CustomRouter;