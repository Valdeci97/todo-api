"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ = _interopRequireDefault(require("."));
var _TaskController = _interopRequireDefault(require("../controllers/TaskController"));
var _GuidMiddleware = _interopRequireDefault(require("../middlewares/GuidMiddleware"));
var _TaskMiddleware = _interopRequireDefault(require("../middlewares/TaskMiddleware"));
var _TokenMiddleware = _interopRequireDefault(require("../middlewares/TokenMiddleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const taskRouter = new _.default();
const taskController = new _TaskController.default();
const tokenMiddleware = new _TokenMiddleware.default();
const taskMiddleware = new _TaskMiddleware.default();
const guidMiddleware = new _GuidMiddleware.default();
const taskRoute = taskController.getRoute();
const taskRouteWithIdParam = `${taskController.getRoute()}/:id`;
taskRouter.addPostRoute(taskRoute, taskController.create, tokenMiddleware.validate, taskMiddleware.validateUserId, taskMiddleware.validateCategory, taskMiddleware.validateTitle, taskMiddleware.validateDescription, taskMiddleware.validateWhen);
taskRouter.addGetRoute(taskRoute, taskController.read, tokenMiddleware.validate);
taskRouter.addGetRoute(taskRouteWithIdParam, taskController.readOne, guidMiddleware.validateGuid, tokenMiddleware.validate);
taskRouter.addPutRoute(taskRouteWithIdParam, taskController.update, guidMiddleware.validateGuid, tokenMiddleware.validate, taskMiddleware.validateUserId, taskMiddleware.validateCategory, taskMiddleware.validateTitle, taskMiddleware.validateDescription, taskMiddleware.validateWhen, taskMiddleware.validateDone);
taskRouter.addDeleteRoute(taskRouteWithIdParam, taskController.delete, guidMiddleware.validateGuid, tokenMiddleware.validate);
var _default = taskRouter;
exports.default = _default;