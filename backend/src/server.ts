import App from './app';
import userRouter from './routes/UserRouter';
import loginRouter from './routes/LoginRouter';
import taskRouter from './routes/TaskRouter';

const server = new App();

server.addRouter(userRouter.getRouter());
server.addRouter(loginRouter.getRouter());
server.addRouter(taskRouter.getRouter());

server.addErrorMiddleware();

export default server;
