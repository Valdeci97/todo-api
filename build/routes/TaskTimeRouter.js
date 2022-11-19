"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ = _interopRequireDefault(require("."));
var _TaskTimeController = _interopRequireDefault(require("../controllers/TaskTimeController"));
var _GuidMiddleware = _interopRequireDefault(require("../middlewares/GuidMiddleware"));
var _TokenMiddleware = _interopRequireDefault(require("../middlewares/TokenMiddleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const taskTimeRouter = new _.default();
const taskTimeController = new _TaskTimeController.default();
const tokenMiddleware = new _TokenMiddleware.default();
const guidMiddleware = new _GuidMiddleware.default();
const taskRoute = taskTimeController.getRoute();
const dayRoute = `${taskRoute}/day/:id`;
const weekRoute = `${taskRoute}/week/:id`;
const monthRoute = `${taskRoute}/month/:id`;
const yearRoute = `${taskRoute}/year/:id`;
const lateRoute = `${taskRoute}/late/:id`;
taskTimeRouter.addGetRoute(dayRoute, taskTimeController.todayTasks, guidMiddleware.validateGuid, tokenMiddleware.validate);
taskTimeRouter.addGetRoute(weekRoute, taskTimeController.weekTasks, guidMiddleware.validateGuid, tokenMiddleware.validate);
taskTimeRouter.addGetRoute(monthRoute, taskTimeController.monthTasks, guidMiddleware.validateGuid, tokenMiddleware.validate);
taskTimeRouter.addGetRoute(yearRoute, taskTimeController.yearTasks, guidMiddleware.validateGuid, tokenMiddleware.validate);
taskTimeRouter.addGetRoute(lateRoute, taskTimeController.lateTasks, guidMiddleware.validateGuid, tokenMiddleware.validate);
var _default = taskTimeRouter;
exports.default = _default;