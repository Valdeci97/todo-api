import CustomRouter from '.';
import TaskController from '../controllers/TaskController';
import GuidMiddleware from '../middlewares/GuidMiddleware';
import TaskMiddleware from '../middlewares/TaskMiddleware';
import TokenMiddleware from '../middlewares/TokenMiddleware';

const taskRouter = new CustomRouter();
const taskController = new TaskController();
const tokenMiddleware = new TokenMiddleware();
const taskMiddleware = new TaskMiddleware();
const guidMiddleware = new GuidMiddleware();
const taskRoute = taskController.getRoute();
const taskRouteWithIdParam = `${taskController.getRoute()}/:id`;

taskRouter.addPostRoute(
  taskRoute,
  taskController.create,
  tokenMiddleware.validate,
  taskMiddleware.validateUserId,
  taskMiddleware.validateCategory,
  taskMiddleware.validateTitle,
  taskMiddleware.validateDescription,
  taskMiddleware.validateWhen
);

taskRouter.addGetRoute(
  taskRoute,
  taskController.read,
  tokenMiddleware.validate
);

taskRouter.addGetRoute(
  taskRouteWithIdParam,
  taskController.readOne,
  guidMiddleware.validateGuid,
  tokenMiddleware.validate
);

taskRouter.addPutRoute(
  taskRouteWithIdParam,
  taskController.update,
  guidMiddleware.validateGuid,
  tokenMiddleware.validate,
  taskMiddleware.validateUserId,
  taskMiddleware.validateCategory,
  taskMiddleware.validateTitle,
  taskMiddleware.validateDescription,
  taskMiddleware.validateWhen,
  taskMiddleware.validateDone
);

taskRouter.addDeleteRoute(
  taskRouteWithIdParam,
  taskController.delete,
  guidMiddleware.validateGuid,
  tokenMiddleware.validate
);

export default taskRouter;
