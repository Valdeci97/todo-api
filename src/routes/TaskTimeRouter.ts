import CustomRouter from '.';
import TaskTimeController from '../controllers/TaskTimeController';
import GuidMiddleware from '../middlewares/GuidMiddleware';
import TokenMiddleware from '../middlewares/TokenMiddleware';

const taskTimeRouter = new CustomRouter();
const taskTimeController = new TaskTimeController();
const tokenMiddleware = new TokenMiddleware();
const guidMiddleware = new GuidMiddleware();
const taskRoute = taskTimeController.getRoute();
const dayRoute = `${taskRoute}/day/:id`;
const weekRoute = `${taskRoute}/week/:id`;
const monthRoute = `${taskRoute}/month/:id`;
const yearRoute = `${taskRoute}/year/:id`;
const lateRoute = `${taskRoute}/late/:id`;

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
