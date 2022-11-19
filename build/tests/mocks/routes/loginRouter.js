"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _LoginController = _interopRequireDefault(require("../../../controllers/LoginController"));
var _LoginService = _interopRequireDefault(require("../../../services/LoginService"));
var _routes = _interopRequireDefault(require("../../../routes"));
var _MockUserModel = _interopRequireDefault(require("../MockUserModel"));
var _MockHashProvider = _interopRequireDefault(require("../MockHashProvider"));
var _MockTokenHandler = _interopRequireDefault(require("../MockTokenHandler"));
var _UserMiddleware = _interopRequireDefault(require("../../../middlewares/UserMiddleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const loginService = new _LoginService.default(new _MockUserModel.default(), new _MockHashProvider.default(), new _MockTokenHandler.default());
const loginController = new _LoginController.default(loginService);
const loginRoute = loginController.getRoute();
const loginRouter = new _routes.default();
const userMiddleware = new _UserMiddleware.default();
loginRouter.addPostRoute(loginRoute, loginController.login, userMiddleware.validateEmail, userMiddleware.validatePassword);
var _default = loginRouter;
exports.default = _default;