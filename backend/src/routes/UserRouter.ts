import CustomRouter from '.';
import UserController from '../controllers/UserController';

const userController = new UserController();
const userRouter = new CustomRouter();
const userRoute = userController.getRoute();
const userRouteWithIdParam = `${userController.getRoute()}/:id`;

userRouter.addPostRoute(userRoute, userController.create);
userRouter.addGetRoute(userRoute, userController.read);
userRouter.addGetRoute(userRouteWithIdParam, userController.readOne);
userRouter.addPatchRoute(userRouteWithIdParam, userController.update);
userRouter.addDeleteRoute(userRouteWithIdParam, userController.delete);

export default userRouter;
