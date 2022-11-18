import CustomRouter from '.';
import UserController from '../controllers/UserController';
import GuidMiddleware from '../middlewares/GuidMiddleware';
import TokenMiddleware from '../middlewares/TokenMiddleware';
import UserMiddleware from '../middlewares/UserMiddleware';

const userController = new UserController();
const userRouter = new CustomRouter();
const userMiddleware = new UserMiddleware();
const guidMiddleware = new GuidMiddleware();
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
  guidMiddleware.validateGuid,
  tokenMiddleware.validate
);

userRouter.addPatchRoute(
  userRouteWithIdParam,
  userController.update,
  guidMiddleware.validateGuid,
  tokenMiddleware.validate
);

userRouter.addDeleteRoute(
  userRouteWithIdParam,
  userController.delete,
  guidMiddleware.validateGuid,
  tokenMiddleware.validate
);

export default userRouter;
