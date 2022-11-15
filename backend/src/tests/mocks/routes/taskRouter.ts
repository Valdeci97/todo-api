import CustomRouter from '../../../routes';
import MockTaskModel from '../MockTaskModel';
import TaskService from '../../../services/TaskService';
import TaskController from '../../../controllers/TaskController';
import TokenMiddleware from '../../../middlewares/TokenMiddleware';
import MockTokenHandler from '../MockTokenHandler';
import TaskMiddleware from '../../../middlewares/TaskMiddleware';
import GuidMiddleware from '../../../middlewares/GuidMiddleware';

const mockTaskModel = new MockTaskModel();
const taskService = new TaskService(mockTaskModel);
const mockTokenHandler = new MockTokenHandler();
const taskController = new TaskController(taskService, mockTokenHandler);
const taskRouter = new CustomRouter();
const tokenMiddleware = new TokenMiddleware(mockTokenHandler);
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
