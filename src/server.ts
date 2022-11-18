import App from './app';
import userRouter from './routes/UserRouter';
import loginRouter from './routes/LoginRouter';
import taskRouter from './routes/TaskRouter';
import taskTimeRouter from './routes/TaskTimeRouter';

const server = new App();

server.addRouter(userRouter.getRouter());
server.addRouter(loginRouter.getRouter());
server.addRouter(taskRouter.getRouter());
server.addRouter(taskTimeRouter.getRouter());

server.addErrorMiddleware();

export default server;
