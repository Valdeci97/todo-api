import CustomRouter from '.';
import LoginController from '../controllers/LoginController';

const loginController = new LoginController();
const loginRouter = new CustomRouter();
const loginRoute = loginController.getRoute();

loginRouter.addPostRoute(loginRoute, loginController.login);

export default loginRouter;
