import CustomRouter from '.';
import UserController from '../controllers/UserController';
import UserMiddleware from '../middlewares/UserMiddleware';

const userController = new UserController();
const userRouter = new CustomRouter();
const userMiddleware = new UserMiddleware();
const userRoute = userController.getRoute();
const userRouteWithIdParam = `${userController.getRoute()}/:id`;

userRouter.addPostRoute(
  userRoute,
  userController.create,
  userMiddleware.validateName,
  userMiddleware.validateEmail,
  userMiddleware.validatePassword
);
userRouter.addGetRoute(userRoute, userController.read);
userRouter.addGetRoute(userRouteWithIdParam, userController.readOne);
userRouter.addPatchRoute(userRouteWithIdParam, userController.update);
userRouter.addDeleteRoute(userRouteWithIdParam, userController.delete);

export default userRouter;
