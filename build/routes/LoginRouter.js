"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ = _interopRequireDefault(require("."));
var _LoginController = _interopRequireDefault(require("../controllers/LoginController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const loginController = new _LoginController.default();
const loginRouter = new _.default();
const loginRoute = loginController.getRoute();
loginRouter.addPostRoute(loginRoute, loginController.login);
var _default = loginRouter;
exports.default = _default;