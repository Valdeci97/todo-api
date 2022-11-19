"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ = _interopRequireDefault(require("."));
var _UserController = _interopRequireDefault(require("../controllers/UserController"));
var _GuidMiddleware = _interopRequireDefault(require("../middlewares/GuidMiddleware"));
var _TokenMiddleware = _interopRequireDefault(require("../middlewares/TokenMiddleware"));
var _UserMiddleware = _interopRequireDefault(require("../middlewares/UserMiddleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const userController = new _UserController.default();
const userRouter = new _.default();
const userMiddleware = new _UserMiddleware.default();
const guidMiddleware = new _GuidMiddleware.default();
const tokenMiddleware = new _TokenMiddleware.default();
const userRoute = userController.getRoute();
const userRouteWithIdParam = `${userController.getRoute()}/:id`;
userRouter.addPostRoute(userRoute, userController.create, userMiddleware.validateName, userMiddleware.validateEmail, userMiddleware.validatePassword);
userRouter.addGetRoute(userRoute, userController.read, tokenMiddleware.validate);
userRouter.addGetRoute(userRouteWithIdParam, userController.readOne, guidMiddleware.validateGuid, tokenMiddleware.validate);
userRouter.addPatchRoute(userRouteWithIdParam, userController.update, guidMiddleware.validateGuid, tokenMiddleware.validate);
userRouter.addDeleteRoute(userRouteWithIdParam, userController.delete, guidMiddleware.validateGuid, tokenMiddleware.validate);
var _default = userRouter;
exports.default = _default;