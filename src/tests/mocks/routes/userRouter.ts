import UserController from '../../../controllers/UserController';
import MockUserModel from '../MockUserModel';
import MockHashProvider from '../MockHashProvider';
import UserService from '../../../services/Userservice';
import CustomRouter from '../../../routes';
import UserMiddleware from '../../../middlewares/UserMiddleware';
import TokenMiddleware from '../../../middlewares/TokenMiddleware';
import GuidMiddleware from '../../../middlewares/GuidMiddleware';
import MockTokenHandler from '../MockTokenHandler';

const userRouter = new CustomRouter();
const mockUserModel = new MockUserModel();
const mockHashProvider = new MockHashProvider();
export const userService = new UserService(mockUserModel, mockHashProvider);
const userController = new UserController(userService);
const userMiddleware = new UserMiddleware();
const tokenMiddleware = new TokenMiddleware(new MockTokenHandler());
const guidMiddleware = new GuidMiddleware();
const userRoute = userController.getRoute();
const userRouteWithIdParam = `${userController.getRoute()}/:id`;

userRouter.addPostRoute(
  userRoute,
  userController.create,
  userMiddleware.validateName,
  userMiddleware.validateEmail,
  userMiddleware.validatePassword
);

userRouter.addGetRoute(
  userRoute,
  userController.read,
  tokenMiddleware.validate
);

userRouter.addGetRoute(
  userRouteWithIdParam,
  userController.readOne,
  guidMiddleware.validateGuid,
  tokenMiddleware.validate
);

userRouter.addPatchRoute(
  userRouteWithIdParam,
  userController.update,
  guidMiddleware.validateGuid,
  tokenMiddleware.validate,
  userMiddleware.validateName
);

userRouter.addDeleteRoute(
  userRouteWithIdParam,
  userController.delete,
  guidMiddleware.validateGuid,
  tokenMiddleware.validate
);

export default userRouter;
