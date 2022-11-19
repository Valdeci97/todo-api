"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _TaskTimeController = _interopRequireDefault(require("../../../controllers/TaskTimeController"));
var _TaskTimeService = _interopRequireDefault(require("../../../services/TaskTimeService"));
var _routes = _interopRequireDefault(require("../../../routes"));
var _MockTaskTimeModel = _interopRequireDefault(require("../MockTaskTimeModel"));
var _TokenMiddleware = _interopRequireDefault(require("../../../middlewares/TokenMiddleware"));
var _MockTokenHandler = _interopRequireDefault(require("../MockTokenHandler"));
var _GuidMiddleware = _interopRequireDefault(require("../../../middlewares/GuidMiddleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const mockTaskTimeModel = new _MockTaskTimeModel.default();
const taskTimeService = new _TaskTimeService.default(mockTaskTimeModel);
const taskTimeController = new _TaskTimeController.default(taskTimeService);
const mockTokenHandler = new _MockTokenHandler.default();
const tokenMiddleware = new _TokenMiddleware.default(mockTokenHandler);
const guidMiddleware = new _GuidMiddleware.default();
const taskTimeRouter = new _routes.default();
const taskTimeRoute = taskTimeController.getRoute();
const dayRoute = `${taskTimeRoute}/day/:id`;
const weekRoute = `${taskTimeRoute}/week/:id`;
const monthRoute = `${taskTimeRoute}/month/:id`;
const yearRoute = `${taskTimeRoute}/year/:id`;
const lateRoute = `${taskTimeRoute}/late/:id`;
taskTimeRouter.addGetRoute(dayRoute, taskTimeController.todayTasks, guidMiddleware.validateGuid, tokenMiddleware.validate);
taskTimeRouter.addGetRoute(weekRoute, taskTimeController.weekTasks, guidMiddleware.validateGuid, tokenMiddleware.validate);
taskTimeRouter.addGetRoute(monthRoute, taskTimeController.monthTasks, guidMiddleware.validateGuid, tokenMiddleware.validate);
taskTimeRouter.addGetRoute(yearRoute, taskTimeController.yearTasks, guidMiddleware.validateGuid, tokenMiddleware.validate);
taskTimeRouter.addGetRoute(lateRoute, taskTimeController.lateTasks, guidMiddleware.validateGuid, tokenMiddleware.validate);
var _default = taskTimeRouter;
exports.default = _default;