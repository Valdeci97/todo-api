import CustomRouter from '.';
import UserController from '../controllers/UserController';
import TokenMiddleware from '../middlewares/TokenMiddleware';
import UserMiddleware from '../middlewares/UserMiddleware';

const userController = new UserController();
const userRouter = new CustomRouter();
const userMiddleware = new UserMiddleware();
const tokenMiddleware = new TokenMiddleware();

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
  tokenMiddleware.validate
);

userRouter.addPatchRoute(
  userRouteWithIdParam,
  userController.update,
  tokenMiddleware.validate
);

userRouter.addDeleteRoute(
  userRouteWithIdParam,
  userController.delete,
  tokenMiddleware.validate
);

export default userRouter;
