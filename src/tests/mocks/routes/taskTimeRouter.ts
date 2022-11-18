import TaskTimeController from '../../../controllers/TaskTimeController';
import TaskTimeService from '../../../services/TaskTimeService';
import CustomRouter from '../../../routes';
import MockTaskTimeModel from '../MockTaskTimeModel';
import TokenMiddleware from '../../../middlewares/TokenMiddleware';
import MockTokenHandler from '../MockTokenHandler';
import GuidMiddleware from '../../../middlewares/GuidMiddleware';

const mockTaskTimeModel = new MockTaskTimeModel();
const taskTimeService = new TaskTimeService(mockTaskTimeModel);
const taskTimeController = new TaskTimeController(taskTimeService);
const mockTokenHandler = new MockTokenHandler();
const tokenMiddleware = new TokenMiddleware(mockTokenHandler);
const guidMiddleware = new GuidMiddleware();
const taskTimeRouter = new CustomRouter();
const taskTimeRoute = taskTimeController.getRoute();
const dayRoute = `${taskTimeRoute}/day/:id`;
const weekRoute = `${taskTimeRoute}/week/:id`;
const monthRoute = `${taskTimeRoute}/month/:id`;
const yearRoute = `${taskTimeRoute}/year/:id`;
const lateRoute = `${taskTimeRoute}/late/:id`;

taskTimeRouter.addGetRoute(
  dayRoute,
  taskTimeController.todayTasks,
  guidMiddleware.validateGuid,
  tokenMiddleware.validate
);

taskTimeRouter.addGetRoute(
  weekRoute,
  taskTimeController.weekTasks,
  guidMiddleware.validateGuid,
  tokenMiddleware.validate
);

taskTimeRouter.addGetRoute(
  monthRoute,
  taskTimeController.monthTasks,
  guidMiddleware.validateGuid,
  tokenMiddleware.validate
);

taskTimeRouter.addGetRoute(
  yearRoute,
  taskTimeController.yearTasks,
  guidMiddleware.validateGuid,
  tokenMiddleware.validate
);

taskTimeRouter.addGetRoute(
  lateRoute,
  taskTimeController.lateTasks,
  guidMiddleware.validateGuid,
  tokenMiddleware.validate
);

export default taskTimeRouter;
