"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userService = exports.default = void 0;
var _UserController = _interopRequireDefault(require("../../../controllers/UserController"));
var _MockUserModel = _interopRequireDefault(require("../MockUserModel"));
var _MockHashProvider = _interopRequireDefault(require("../MockHashProvider"));
var _Userservice = _interopRequireDefault(require("../../../services/Userservice"));
var _routes = _interopRequireDefault(require("../../../routes"));
var _UserMiddleware = _interopRequireDefault(require("../../../middlewares/UserMiddleware"));
var _TokenMiddleware = _interopRequireDefault(require("../../../middlewares/TokenMiddleware"));
var _GuidMiddleware = _interopRequireDefault(require("../../../middlewares/GuidMiddleware"));
var _MockTokenHandler = _interopRequireDefault(require("../MockTokenHandler"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const userRouter = new _routes.default();
const mockUserModel = new _MockUserModel.default();
const mockHashProvider = new _MockHashProvider.default();
const userService = new _Userservice.default(mockUserModel, mockHashProvider);
exports.userService = userService;
const userController = new _UserController.default(userService);
const userMiddleware = new _UserMiddleware.default();
const tokenMiddleware = new _TokenMiddleware.default(new _MockTokenHandler.default());
const guidMiddleware = new _GuidMiddleware.default();
const userRoute = userController.getRoute();
const userRouteWithIdParam = `${userController.getRoute()}/:id`;
userRouter.addPostRoute(userRoute, userController.create, userMiddleware.validateName, userMiddleware.validateEmail, userMiddleware.validatePassword);
userRouter.addGetRoute(userRoute, userController.read, tokenMiddleware.validate);
userRouter.addGetRoute(userRouteWithIdParam, userController.readOne, guidMiddleware.validateGuid, tokenMiddleware.validate);
userRouter.addPatchRoute(userRouteWithIdParam, userController.update, guidMiddleware.validateGuid, tokenMiddleware.validate, userMiddleware.validateName);
userRouter.addDeleteRoute(userRouteWithIdParam, userController.delete, guidMiddleware.validateGuid, tokenMiddleware.validate);
var _default = userRouter;
exports.default = _default;