import LoginController from '../../../controllers/LoginController';
import LoginService from '../../../services/LoginService';
import CustomRouter from '../../../routes';
import MockUserModel from '../MockUserModel';
import MockHashProvider from '../MockHashProvider';
import MockTokenHandler from '../MockTokenHandler';
import UserMiddleware from '../../../middlewares/UserMiddleware';

const loginService = new LoginService(
  new MockUserModel(),
  new MockHashProvider(),
  new MockTokenHandler()
);

const loginController = new LoginController(loginService);
const loginRoute = loginController.getRoute();
const loginRouter = new CustomRouter();
const userMiddleware = new UserMiddleware();

loginRouter.addPostRoute(
  loginRoute,
  loginController.login,
  userMiddleware.validateEmail,
  userMiddleware.validatePassword
);

export default loginRouter;
