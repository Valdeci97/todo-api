import CustomRouter from '.';
import TaskTimeController from '../controllers/TaskTimeController';

const taskTimeRouter = new CustomRouter();
const taskTimeController = new TaskTimeController();
const taskRoute = taskTimeController.getRoute();
const dayRoute = `${taskRoute}/day/:id`;
const weekRoute = `${taskRoute}/week/:id`;
const monthRoute = `${taskRoute}/month/:id`;
const yearRoute = `${taskRoute}/year/:id`;
const lateRoute = `${taskRoute}/late/:id`;

taskTimeRouter.addGetRoute(dayRoute, taskTimeController.todayTasks);
taskTimeRouter.addGetRoute(weekRoute, taskTimeController.weekTasks);
taskTimeRouter.addGetRoute(monthRoute, taskTimeController.monthTasks);
taskTimeRouter.addGetRoute(yearRoute, taskTimeController.yearTasks);
taskTimeRouter.addGetRoute(lateRoute, taskTimeController.lateTasks);

export default taskTimeRouter;
