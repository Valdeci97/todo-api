import CustomRouter from '.';
import TaskController from '../controllers/TaskController';

const taskRouter = new CustomRouter();
const taskController = new TaskController();
const taskRoute = taskController.getRoute();
const taskRouteWithIdParam = `${taskController.getRoute()}/:id`;

taskRouter.addPostRoute(taskRoute, taskController.create);
taskRouter.addGetRoute(taskRoute, taskController.read);
taskRouter.addGetRoute(taskRouteWithIdParam, taskController.readOne);
taskRouter.addPutRoute(taskRouteWithIdParam, taskController.update);
taskRouter.addDeleteRoute(taskRouteWithIdParam, taskController.delete);

export default taskRouter;
